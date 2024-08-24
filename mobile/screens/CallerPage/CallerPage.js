import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {copyToClipboard} from '../../utils/call';
import captureScreen from '../../components/ScreenCapture';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import {db} from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  deleteField,
} from 'firebase/firestore';

import CallActionBox from '../../components/CallActionBox';
import io from 'socket.io-client';
import CustomButton2 from '../../components/CustomButton2';
const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
import EnglishToHebrew from '../../utils/constants/EnglishToHebrew';
const URL = `${process.env.BASE_URL}:${process.env.FLASK_PORT}`;
const socket = io(URL);

const CallerPage = ({roomId, screens, setScreen}) => {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isOffCam, setIsOffCam] = useState(false);
  const [signText, setSignText] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [runPeriodically, setRunPeridically] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  useEffect(() => {
    if (localStream && roomId) {
      startCall(roomId);
    }
  }, [localStream, roomId]);

  const MILISECONDS = 5000;
  useEffect(() => {
    console.log(`runPeriodically is set to ${runPeriodically}`);
    if (runPeriodically) {
      const interval = setInterval(() => {
        drawImage(); // emit Image to socket
      }, MILISECONDS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }
  }, [runPeriodically]);

  useEffect(() => {
    if (signText.length >= 20) {
      setSignText(signText => signText.slice(10));
    }
  }, [signText]);

  useEffect(() => {
    // Join the room after the socket has been established
    socket.emit('join', {roomId});

    // Leave the room when the component unmounts
    return () => {
      socket.emit('leave', {roomId});
    };
  }, []);

  useEffect(() => {
    socket.on('message', data => {
      if (data.prediction == 'nothing') {
        // nothing
      } else if (data.prediction == 'del') {
        setSignText(signText => signText.slice(0, -1));
      } else if (data.prediction == 'space') {
        setSignText(signText => signText + ' ');
      } else if (EnglishToHebrew[data.prediction] == undefined) {
        // setSignText(signText => signText + 'א');
      } else {
        setSignText(signText => signText + EnglishToHebrew[data.prediction]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    socket.on('voice_text', data => {
      setVoiceText(data.text);
    });
    return () => {
      socket.off('voice_text');
    };
  }, []);

  const drawImage = async () => {
    const image = await captureScreen();
    socket.emit('send_image', {roomId: roomId, image: image});
  };

  //End call button
  async function endCall() {
    if (cachedLocalPC) {
      const senders = cachedLocalPC.getSenders();
      senders.forEach(sender => {
        cachedLocalPC.removeTrack(sender);
      });
      cachedLocalPC.close();
    }

    const roomRef = doc(db, 'room', roomId);
    await updateDoc(roomRef, {answer: deleteField()});

    setLocalStream();
    setRemoteStream(); // set remoteStream to null or empty when callee leaves the call
    setCachedLocalPC();
    // cleanup
    setScreen(screens.ROOM); //go back to room screen
  }

  //start local webcam on your device
  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async id => {
    const localPC = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => {
      localPC.addTrack(track, localStream);
    });

    const roomRef = doc(db, 'room', id);
    const callerCandidatesCollection = collection(roomRef, 'callerCandidates');
    const calleeCandidatesCollection = collection(roomRef, 'calleeCandidates');

    localPC.addEventListener('icecandidate', e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      addDoc(callerCandidatesCollection, e.candidate.toJSON());
    });

    localPC.ontrack = e => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach(track => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    await setDoc(roomRef, {offer, connected: false}, {merge: true});

    // Listen for remote answer
    onSnapshot(roomRef, doc => {
      const data = doc.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        localPC.setRemoteDescription(rtcSessionDescription);
      } else {
        setRemoteStream();
      }
    });

    // when answered, add candidate to peer connection
    onSnapshot(calleeCandidatesCollection, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const toggleCamera = () => {
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsOffCam(!isOffCam);
    });
  };

  const clearSL = () => {
    setSignText('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.signUserContainer}>
        <View style={styles.signUserVideo}>
          <RTCView
            style={{flex: 1}}
            streamURL={localStream && localStream.toURL()}
            objectFit={'cover'}
          />
        </View>
      </View>
      <View style={styles.speakerContainer}>
        {remoteStream && (
          <View style={styles.speakerVideo}>
            <RTCView
              style={{flex: 1}}
              streamURL={remoteStream && remoteStream.toURL()}
              objectFit={'cover'}
            />
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.buttonView}>
          <CustomButton2
            functionToPress={clearSL}
            textToDisplay={'Reset'}></CustomButton2>
          <CustomButton2
            functionToPress={drawImage}
            textToDisplay={'Capture'}></CustomButton2>
          <CustomButton2
            functionToPress={() => {
              setRunPeridically(!runPeriodically);
            }}
            textToDisplay={'Run continously'}></CustomButton2>
        </View>
        <View style={styles.textView}>
          <Text className="text-lg font-bold text-center text-black">
            שפת הסימנים: {signText}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text className="text-lg font-bold text-center text-black">
            שפה מדוברת: {voiceText}
          </Text>
        </View>
      </View>
      <View style={styles.callActionsContainer}>
        <CallActionBox
          switchCamera={switchCamera}
          toggleMute={toggleMute}
          toggleCamera={toggleCamera}
          endCall={endCall}
          copyToClipboard={() => copyToClipboard(roomId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signUserContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUserVideo: {
    height: '95%',
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: 'red',
    borderRadius: 5,
  },
  speakerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerVideo: {
    height: '95%',
    aspectRatio: 1,
    borderWidth: 4,
    // borderColor: 'white',
    borderRadius: 5,
  },
  textContainer: {
    flex: 2,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  callActionsContainer: {
    justifyContent: 'flex-end',
  },
});

export default CallerPage;
