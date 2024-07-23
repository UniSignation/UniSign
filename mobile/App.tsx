import React from 'react';
import UniSignBackground from './components/Background';
import Navigation from './components/navigation';

export default function App() {
  return (
    <UniSignBackground>
        <Navigation/>
    </UniSignBackground>
  );
}



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import captureScreen from './components/ScreenCapture';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const drawImage = async () => {
//     let screenshot = await captureScreen();
//     // console.log(screenshot);
//   };
//   return (
//     // <SafeAreaView style={backgroundStyle}>
//     //   <StatusBar
//     //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//     //     backgroundColor={backgroundStyle.backgroundColor}
//     //   />
//     //   <ScrollView
//     //     contentInsetAdjustmentBehavior="automatic"
//     //     style={backgroundStyle}>
//     //     <Header />
//     //     <View
//     //       style={{
//     //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//     //       }}>
//     //       <Section title="Step One">
//     //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//     //         screen and then come back to see your edits.
//     //       </Section>
//     //       <Section title="See Your Changes">
//     //         <ReloadInstructions />
//     //       </Section>
//     //       <Section title="Debug">
//     //         <DebugInstructions />
//     //       </Section>
//     //       <Section title="Learn More">
//     //         Read the docs to discover what to do next:
//     //       </Section>
//     //       <LearnMoreLinks />
//     //     </View>
//     //   </ScrollView>
//     // </SafeAreaView>
//     <View style={styles.container}>
//       <Button title="Capture Screen" onPress={drawImage} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// import React, {useEffect, useState} from 'react';
// import {View, Button, StyleSheet} from 'react-native';
// import captureScreen from '../components/ScreenCapture';
// import {io} from 'socket.io-client';

// // const socket = io('http://192.168.0.108:5001/');

// const TempScreen = () => {
//   // const [socket, setSocket] = useState();
//   const [image, setImage] = useState();

//   // useEffect(() => {
//   //   console.log('starting socket');
//   // }, []);

//   const drawImage = async () => {
//     // let screenshot = await captureScreen();
//     // screenshot.then(png => console.log(png));
//     // console.log(screenshot);
//     let screenshot = await captureScreen();
//     console.log(screenshot)
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Capture Screen" onPress={drawImage} />
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
