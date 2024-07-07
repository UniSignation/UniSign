import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import captureScreen from '../components/ScreenCapture';
import {io} from 'socket.io-client';

// const socket = io('http://192.168.0.108:5001/');

const TempScreen = () => {
  // const [socket, setSocket] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    console.log('starting socket');
  }, []);

  const drawImage = async () => {
    // let screenshot = await captureScreen();
    // screenshot.then(png => console.log(png));
    // console.log(screenshot);
    let screenshot = await captureScreen();
    console.log(screenshot)
  };

  return (
    <View style={styles.container}>
      <Button title="Capture Screen" onPress={drawImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TempScreen;

// import captureScreen from '../components/ScreenCapture';
// import React from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import { captureRef } from 'react-native-view-shot';

// const TempScreen = () => {
//   const viewRef = React.useRef();

//   const captureScreen = async () => {
//     try {
//       const uri = await captureRef(viewRef, {
//         format: 'png',
//         quality: 1.0,
//         result: 'base64',
//       });

//       socket.emit('process_image', { image: uri });

//       socket.on('image_processed', (data) => {
//         if (data.error) {
//           Alert.alert('Error', data.error);
//         } else {
//           Alert.alert('Success', 'Image processed successfully');
//           // Here you can handle the processed result
//           // For now, we'll just log it
//           console.log('Processed image:', data.result);
//         }
//       });
//     } catch (error) {
//       console.error('Error capturing screen:', error);
//     }
//   };

//   return (
//     <View style={styles.container} ref={viewRef}>
//       <Button title="Capture Screen and Process" onPress={captureScreen} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default TempScreen;
