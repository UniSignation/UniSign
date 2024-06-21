import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from 'axios';
const API_URL = 'http://192.168.0.102:3000';

export default function TabOneScreen() {
  const [roomId, setRoomId] = useState('');
  useEffect(() => {
    console.log(`roomId: ${roomId}`);
  }, [roomId]);
  const startMeeting = async () => {
    const url = `${API_URL}/db/rooms/${roomId}`
    if (!roomId) {
      generateRandomId();
    }
  };

  const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    setRoomId(result);
  };

  const joinMeeting = async () => {
    if (roomId) {
      try {
        const url = `${API_URL}/db/rooms/${roomId}`;
        await axios
          .get(url)
          .then((response) => {
            // joinCall()
          })
          .catch((error) => {
            if (error.response) {
              Alert.alert(
                `Error ${error.response.status}: ${error.response.data}`
              );
              console.warn(
                `Error ${error.response.status}: ${error.response.data}`,
                `\nError headers: ${error.response.headers}`
              );
            } else if (error.request) {
              console.warn('Error request:', error.request);
            } else {
              console.warn('Error message:', error.message);
            }
            // Uncomment for complex errors // console.log('Error config:', error.config);
          });
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'grey' }}>
      <View style={styles.topAndBottom}>
        <Text style={{ color: 'white', fontSize: 20 }}>Room Screen</Text>
      </View>
      <View style={{ flex: 8, backgroundColor: 'green', flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'grey' }}></View>
        <View style={styles.middle}>
          <View>
            <Text>Enter Room ID:</Text>
            <TextInput
              style={styles.textBox}
              value={roomId}
              onChangeText={setRoomId}
            />
            <View>
              <TouchableOpacity onPress={generateRandomId}>
                <Text style={{ fontSize: 25 }}>Start meeting</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={joinMeeting}>
                <Text style={{ fontSize: 25 }}>Join meeting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'grey' }}></View>
      </View>
      <View style={styles.topAndBottom}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  topAndBottom: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middle: {
    flex: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'black'
  }
});

// axios request
// const axiosHandler = async () => {
//     try {
//       const url = `${API_URL}/db/rooms/123`;
//       console.log(url);
//       await axios.get(url)
//         .then((response) => {
//           // succesful request
//           console.log('Response data:', response.data);
//           console.log('Response status:', response.status);
//           console.log('Response statusText:', response.statusText);
//           console.log('Response headers:', response.headers);
//           console.log('Response config:', response.config);
//         })
//         .catch((error) => {
//           if (error.response) {
//             // The request was made and the server responded with a status code that falls out of the range of 2xx
//             console.log('Error data:', error.response.data);
//             console.log('Error status:', error.response.status);
//             console.log('Error headers:', error.response.headers);
//           } else if (error.request) {
//             // The request was made but no response was received
//             console.log('Error request:', error.request);
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log('Error message:', error.message);
//           }
//           console.log('Error config:', error.config);
//         });
//     } catch (error) {
//       console.error('Unexpected error:', error);
//     }
// };
