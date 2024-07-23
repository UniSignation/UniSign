import {View, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CallActionBox = ({
  switchCamera,
  toggleMute,
  toggleCamera,
  endCall,
  copyToClipboard,
}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onToggleCamera = () => {
    toggleCamera();
    setIsCameraOn(!isCameraOn);
  };
  const onToggleMicrophone = () => {
    toggleMute();
    setIsMicOn(!isMicOn);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.quintant}>
        <Pressable style={styles.pressable} onPress={switchCamera}>
          <Icon name={'flip-camera-ios'} size={25} color={'white'} />
        </Pressable>
      </View>
      <View style={styles.quintant}>
        <Pressable style={styles.pressable} onPress={onToggleCamera}>
          <Icon
            name={isCameraOn ? 'videocam' : 'videocam-off'}
            size={25}
            color={'white'}
          />
        </Pressable>
      </View>
      <View style={styles.quintant}>
        <Pressable style={styles.pressable} onPress={onToggleMicrophone}>
          <Icon name={isMicOn ? 'mic' : 'mic-off'} size={25} color={'white'} />
        </Pressable>
      </View>
      <View style={styles.quintant}>
        <Pressable style={styles.pressable} onPress={copyToClipboard}>
          <Icon name={'content-copy'} size={25} color={'white'} />
        </Pressable>
      </View>
      <View style={styles.quintant}>
        <Pressable
          style={{...styles.pressable, backgroundColor: 'white'}}
          onPress={endCall}>
          <Icon name={'call'} size={25} color={'black'} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1f2937',
    width: '100%',
    height: 80,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quintant: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallActionBox;
