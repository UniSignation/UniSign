import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import {copyToClipboard} from '../../utils/call';
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
import Voice from '@react-native-voice/voice';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const URL = 'http://192.168.0.102:5000';
const socket = io(URL);

const JoinerPage = ({roomId, screens, setScreen}) => {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [signText, setSignText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isOffCam, setIsOffCam] = useState(false);
  const [started, setStarted] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  let tempArray = [];
  let dict = new Map();
  dict.set('B', 'ב');
  dict.set('I', 'ו');
  dict.set('C', 'כ');
  dict.set('L', 'ל');
  dict.set('M', 'ם');
  dict.set('N', 'נ');
  dict.set('S', 'ס');
  dict.set('R', 'ר');
  dict.set('W', 'ש');
  dict.set('T', 'ת');
  dict.set('D', 'ו');
  //Automatically start stream
  useEffect(() => {
    startLocalStream();
  }, []);

  useEffect(() => {
    if (localStream) {
      joinCall(roomId);
    }
  }, [localStream]);

  useEffect(() => {
    // Join the room after the socket has been established
    socket.emit('join', {roomId});

    // Define Voice functions
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
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
      } else if (dict.get(data.prediction) == undefined) {
        // setSignText(signText => signText + 'א');
      } else {
        setSignText(signText => signText + dict.get(data.prediction));
      }
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (signText.length >= 20) {
      setSignText(signText => signText.slice(10));
    }
  }, [signText]);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setStarted(false);
  };

  const onSpeechResults = e => {
    setVoiceText('');
    console.log('onSpeechResults: ', e);
    while (tempArray.length > 0) {
      tempArray.shift();
    }
    let result = e.value[0].split(' ');
    result.forEach(word => {
      // if (tempArray.includes(word)) {
      //   console.log(`Duplicate word: ${word}`);
      // } else {
      tempArray.push(word);
      // }
    });

    while (tempArray.join('').length >= 20) {
      // console.log(`tempArray is ${tempArray}`);
      tempArray.shift();
    }
    let jointText = tempArray.join(' ');
    socket.emit('send_voice', {roomId: roomId, text: jointText});
    setVoiceText(jointText);
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setStarted(false);
  };

  const startRecording = async () => {
    try {
      // Hebrew
      await Voice.start('he-IL');
      // English
      // await Voice.start('en-US');
      // setVoiceText('');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
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
    await updateDoc(roomRef, {answer: deleteField(), connected: false});

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

  //join call function
  const joinCall = async id => {
    const roomRef = doc(db, 'room', id);
    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists) return;
    const localPC = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => {
      localPC.addTrack(track, localStream);
    });

    const callerCandidatesCollection = collection(roomRef, 'callerCandidates');
    const calleeCandidatesCollection = collection(roomRef, 'calleeCandidates');

    localPC.addEventListener('icecandidate', e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      addDoc(calleeCandidatesCollection, e.candidate.toJSON());
    });

    localPC.ontrack = e => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach(track => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
    };

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    await updateDoc(roomRef, {answer, connected: true}, {merge: true});

    onSnapshot(callerCandidatesCollection, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    onSnapshot(roomRef, doc => {
      const data = doc.data();
      if (!data.answer) {
        setScreen(screens.ROOM);
      }
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
        <View style={styles.speakerVideo}>
          <RTCView
            style={{flex: 1}}
            streamURL={remoteStream && remoteStream.toURL()}
            objectFit={'cover'}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
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
        <View style={styles.buttonView}>
          <Button
            title={started ? 'Stop Recording' : 'Start Recording'}
            onPress={started ? stopRecording : startRecording}
          />
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
    borderColor: 'white',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  callActionsContainer: {
    justifyContent: 'flex-end',
  },
});

export default JoinerPage;
