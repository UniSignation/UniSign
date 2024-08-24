import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ started, startRecording, stopRecording }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={started ? stopRecording : startRecording}
    >
      <Text style={styles.buttonText}>
        {started ? 'Stop Recording' : 'Start Recording'}
      </Text>
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

export default CustomButton;
