import { NativeModules } from 'react-native';

const { ScreenCapture } = NativeModules;

const captureScreen = async () => {
  try {
    const base64Image = await ScreenCapture.captureScreen();
    return base64Image;
  } catch (error) {
    console.error('Error capturing screen:', error);
  }
};

export default captureScreen;
