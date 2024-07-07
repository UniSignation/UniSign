import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {db} from '../firebase';
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

export default function RoomScreen({setScreen, screens, setRoomId, roomId}) {
  const onCallOrJoin = screen => {
    if (roomId.length > 0) {
      setScreen(screen);
    }
  };
  async function requestStoragePermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  //generate random room id
  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log(result);
    });
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
      console.log(result);
    });
    // request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
    //   console.log(result);
    // });
    requestStoragePermission();
    const generateRandomId = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return setRoomId(result);
    };
    generateRandomId();
  }, []);

  //checks if room is existing
  const checkMeeting = async () => {
    if (roomId) {
      const roomRef = doc(db, 'room', roomId);
      const roomSnapshot = await getDoc(roomRef);

      // console.log(roomSnapshot.data());

      if (!roomSnapshot.exists() || roomId === '') {
        // console.log(`Room ${roomId} does not exist.`);
        Alert.alert('Wait for your instructor to start the meeting.');
        return;
      } else {
        onCallOrJoin(screens.JOIN);
      }
    } else {
      Alert.alert('Provide a valid Room ID.');
    }
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-center">Enter Room ID:</Text>
      <TextInput
        className="bg-white border-sky-600 border-2 mx-5 my-3 p-2 rounded-md"
        value={roomId}
        onChangeText={setRoomId}
      />
      <View className="gap-y-3 mx-5 mt-2">
        <TouchableOpacity
          className="bg-sky-300 p-2  rounded-md"
          onPress={() => onCallOrJoin(screens.CALL)}>
          <Text className="color-black text-center text-xl font-bold ">
            Start meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-sky-300 p-2 rounded-md"
          onPress={() => checkMeeting()}>
          <Text className="color-black text-center text-xl font-bold ">
            Join meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-sky-300 p-2  rounded-md"
          onPress={() => onCallOrJoin(screens.TEMP)}>
          <Text className="color-black text-center text-xl font-bold ">
            Temp screen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
