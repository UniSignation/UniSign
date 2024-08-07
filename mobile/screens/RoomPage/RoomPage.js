import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button, ClickableText} from '../../components/Button';
import { Title } from '../../components/Text';
import CustomInput from '../../components/CustomInput';

import axios from 'axios';
const BASE_URL = 'http://192.168.0.105:3000';


const RoomPage = ({ control, handleSubmit, setScreen, screens, setRoomId, roomId }) => {
  const [message, setMessage] = useState("");

  const onBackPressed = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/user/getUser`, { email });
        setMessage(response.data.message);
        const firstName = response.data.firstName;
        navigation.navigate("Home", { firstName, email });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setMessage(error.response?.data?.error || 'An error occurred');
        } else {
            setMessage('An unknown error occurred');
        }
    }
}

  const onCallOrJoin = screen => {
    if (roomId.length > 0) {
      setScreen(screen);
    }
  };

  //generate random room id
  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log(result);
    });
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
      console.log(result);
    });
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
        // Alert.alert('Wait for your instructor to start the meeting.');
        onCallOrJoin(screens.JOIN);
        return;
      } else {
        onCallOrJoin(screens.JOIN);
      }
    } else {
      Alert.alert('Provide a valid Room ID.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1}}/>
       <View style={styles.titleView}>
                <Title text='Enter Room ID:' type='' />
            </View>
      <CustomInput
        control={control}
        name="roomId"
        placeholder=""
      />
      <View style={styles.inputContainer} >
        <Button onPress={handleSubmit(() => onCallOrJoin(screens.CALL))} text="Start meeting" />
        <Button onPress={handleSubmit(checkMeeting)} text="Join meeting" />
        <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width:"100%"
  },
  titleView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  },
  inputContainer: {
    flex: 3,
    width: '100%',
    alignItems: "center",
},
})

export default RoomPage;
