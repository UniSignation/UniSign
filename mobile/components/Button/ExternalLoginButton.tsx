import { Text, Pressable, StyleSheet, Image, View } from 'react-native';
import React from 'react';

type ButtonProps = {
  onPress: () => void,
  text: string,
  type: StyleType
};

type StyleType = 'Facebook' | 'Google';

const ExternalLoginButton: React.FC<ButtonProps> = ({ onPress, text, type }) => {
  const imageSource = type === 'Facebook' 
    ? require('../../assets/images/facebook.png') 
    : require('../../assets/images/google.png');

  return (
    <Pressable onPress={onPress} style={styles[`${type}Button`]}>
      <View style={styles.buttonContent}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles[`text${type}`]}>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textFacebook: {
    color: "#4765A9",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10, 
},
  textGoogle: {
    color: "#DD4D44",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  FacebookButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7EAF4",
    marginVertical: 10,
    flexDirection: 'row'
  },
  GoogleButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAE9EA",
    marginVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: 25, 
    height: 25, 
    resizeMode: 'contain',
  },
  buttonContent: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
});

export default ExternalLoginButton;
