import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Title from '../../components/Text/Title';
import CustomInput from '../../components/CustomInput';
import {Button, ClickableText} from '../../components/Button';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ResetPassSchema, ResetPassInfo} from '../../schema/ResetPassSchema';
import {Message} from '../../components/Text';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../components/navigation';

type ResetPassPageRouteProp = RouteProp<RootStackParamList, 'Reset password'>;
type ResetPassNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Reset password'
>;

type Props = {
  route: ResetPassPageRouteProp;
};

const ResetPasswordPage = ({route}: Props) => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation<ResetPassNavigationProp>();

  const [timeRemaining, setTimeRemaining] = useState(300); // 300 seconds = 5 minutes
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {email} = route.params;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [timeRemaining]);

  const {control, handleSubmit, reset} = useForm<ResetPassInfo>({
    resolver: zodResolver(ResetPassSchema),
  });

  const onSendPressed = async (data: ResetPassInfo) => {
    const {code, password} = data;
    try {
      const response = await axios.post(`${URL}/user/codeMatch`, {
        email,
        code,
      });
      await axios.post(`${URL}/user/updatePassword`, {email, password});
      setMessage(response.data.message);
      navigation.navigate('Login');
      await axios.post(`${URL}/user/deleteCode`, {email});
    } catch (error) {
      console.error(`${error} ResetPasswordPage ${URL}/user/getUser`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const onLoginPressed = async () => {
    try {
      const response = await axios.post(`${URL}/user/deleteCode`, {email});
      setMessage(response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      console.error(`${error} ResetPasswordPage ${URL}/user/getUser`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };
  const onSendAgainPressed = async () => {
    try {
      await axios.post(`${URL}/user/deleteCode`, {email});
      const response = await axios.post(`${URL}/user/sendEmail`, {email});
      setMessage(response.data.message);
      navigation.navigate('Reset password', {email});
      reset();
    } catch (error) {
      console.error(`${error} ResetPasswordPage ${URL}/user/getUser`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}></View>
      <View style={styles.titleView}>
        <Title text="Reset your password" type="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>Code*</Text>
        <CustomInput
          control={control}
          name="code"
          placeholder="Enter your code"
        />
        <Text style={styles.textStyle}>
          Time remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15, color: '#443532'}}>
            Didn't get a code?
          </Text>
          <ClickableText
            onPress={onSendAgainPressed}
            text="send again!"
            type="Forgot"
          />
        </View>
        <CustomInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <CustomInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        {message ? <Message text={message} /> : null}
        <Button onPress={handleSubmit(onSendPressed)} text="SEND" />
        <ClickableText
          onPress={onLoginPressed}
          text="Back to Login"
          type="Forgot"
        />
      </View>
      <View style={{flex: 5}}></View>
    </View>
  );
};

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
});

export default ResetPasswordPage;
