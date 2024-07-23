import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceToText = () => {
  const [started, setStarted] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    setStarted(false);
  };

  const onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    setText(e.value[0]);
  };

  const onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    setStarted(false);
  };

  const startRecording = async () => {
    try {
      // Hebrew
      // await Voice.start('he-IL');
      // English
      await Voice.start('en-US');
      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Press the button and start speaking in Hebrew.</Text>
      <Button
        title={started ? "Stop Recording" : "Start Recording"}
        onPress={started ? stopRecording : startRecording}
      />
      <Text style={styles.transcribedText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  transcribedText: {
    marginTop: 16,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default VoiceToText;
