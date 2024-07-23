import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface UniSignBackgroundProps {
  children: ReactNode;
}

const UniSignBackground: React.FC<UniSignBackgroundProps> = ({ children }) => {
  return (
    <ImageBackground style={[styles.image]} source={require('../../assets/images/Background.png')} resizeMode='cover'>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  }
});

export default UniSignBackground;
