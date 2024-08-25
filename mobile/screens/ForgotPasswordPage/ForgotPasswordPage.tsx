import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Title, Message} from '../../components/Text';
import CustomInput from '../../components/CustomInput';
import {Button, ClickableText} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ForgotPassSchema, ForgotPassInfo} from '../../schema/ForgotPassSchema';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../components/navigation';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;
type ForgotPassScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Forgot password'
>;

const ForgotPasswordPage = () => {
  const navigation = useNavigation<ForgotPassScreenNavigationProp>();
  const [message, setMessage] = useState('');

  const {control, handleSubmit} = useForm<ForgotPassInfo>({
    resolver: zodResolver(ForgotPassSchema),
  });

  const onSendPressed = async (data: ForgotPassInfo) => {
    const {email} = data;
    try {
      await axios.post(`${URL}/user/getUser`, {email});
      const response = await axios.post(`${URL}/user/sendEmail`, {email});
      setMessage(response.data.message);
      navigation.navigate('Reset password', {email});
    } catch (error) {
      console.error(`ForgotPasswordPage ${URL}/user/getUser`)
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}></View>
      <View style={styles.titleView}>
        <Title text="Reset your password" type="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>Email *</Text>
        <CustomInput
          control={control}
          name="email"
          placeholder="enter your email"
        />
        {message ? <Message text={message} /> : null}
        <Button onPress={handleSubmit(onSendPressed)} text="SEND" />
        <ClickableText
          onPress={onLoginPressed}
          text="Back to Login"
          type="Forgot"
        />
      </View>
      <View style={{flex: 4}}></View>
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
export default ForgotPasswordPage;
