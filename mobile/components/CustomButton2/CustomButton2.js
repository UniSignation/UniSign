import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton2 = ({functionToPress, textToDisplay}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={functionToPress}>
      <Text style={styles.buttonText}>{textToDisplay}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0c99c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    // color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default CustomButton2;
