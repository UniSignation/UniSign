import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import Title from '../../components/Text/Title';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText } from '../../components/Button';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ReportProblemSchema,
  ReportProblemInfo,
} from '../../schema/ReportProblem';
import { Message } from '../../components/Text';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';

const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

type ReportOfProblemRouteProp = RouteProp<
  RootStackParamList,
  'Report of problem'
>;
type ReportOfProblemNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Report of problem'
>;

type Props = {
  route: ReportOfProblemRouteProp;
};

const ReportOfProblemPage = ({ route }: Props) => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation<ReportOfProblemNavigationProp>();
  const [description, setDescription] = useState('');
  const { email } = route.params;

  const { control, handleSubmit } = useForm<ReportProblemInfo>({
    resolver: zodResolver(ReportProblemSchema),
  });

  const onSendPressed = async (data: ReportProblemInfo) => {
    const { subject } = data;
    try {
      const User = await axios.post(`${URL}/user/getUserWithoutPicture`, { email });
      const firstName = User.data.firstName;
      const response = await axios.post(`${URL}/user/sendReport`, { email, firstName, subject, description });
      setMessage(response.data.message);

      // Show Alert after successful report submission
      Alert.alert(
        "Report Sent",
        "Your report has been sent successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Home', { firstName, email }),
          }
        ]
      );
    } catch (error) {
      console.error(`${error} ReportOfProblemPage ${URL}/user/sendReport`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const onBackPressed = async () => {
    try {
      const response = await axios.post(`${URL}/user/getUser`, { email });
      setMessage(response.data.message);
      const firstName = response.data.firstName;
      navigation.navigate('Home', { firstName, email });
    } catch (error) {
      console.error(`${error} ReportOfProblemPage ${URL}/user/getUser`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.titleView}>
        <Title text="Report of problem" type="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>Subject*</Text>
        <CustomInput control={control} name="subject" placeholder="" />
        <Text style={styles.textStyle}>Description</Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={description}
          onChangeText={setDescription}
        />
        {message ? <Message text={message} /> : null}
        <Button onPress={handleSubmit(onSendPressed)} text="SEND" />
        <ClickableText onPress={onBackPressed} text="Back" type="Forgot" />
      </View>
      <View style={{ flex: 6 }}></View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#443532',
  },
  textInput: {
    width: '90%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#f0d0aa',
    borderRadius: 30,
  },
});

export default ReportOfProblemPage;
