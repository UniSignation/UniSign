import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import {
  Button,
  ClickableText,
  ExternalLoginButton,
} from '../../components/Button';
import {Title, Message} from '../../components/Text';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, LoginInfo} from '../../schema/loginSchema';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../components/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [message, setMessage] = useState('');

  const {control, handleSubmit, reset} = useForm<LoginInfo>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '32882604580-a2b4n25gnipeqjdbh6lceid3vb6jenf7.apps.googleusercontent.com',
    });
    logoutOnLoad();
  }, []);

  const logoutOnLoad = async () => {
    if (GoogleSignin.getCurrentUser() != null) {
      await GoogleSignin.signOut();
    }
    console.log('Google user logged out.');
  };
  const onLoginPressed = async (data: LoginInfo) => {
    console.log(`${URL}/user/login`);
    const {email, password} = data;
    try {
      const response = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      const user = await axios.post(`${URL}/user/getUser`, {email});
      const firstName = user.data.firstName;
      if (user.data.isAdmin)
        navigation.navigate('HomeAdmin', {firstName, email});
      else navigation.navigate('Home', {firstName, email});
      reset();
    } catch (error) {
      console.error(`${error} LoginPage ${URL}/user/getUser`);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const onLoginGooglePressed = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();

    console.log(user);
    // console.log(idToken);
  };

  const onLoginFacebookPressed = async () => {
    try {
      // Check if the user is signed in
      // const isSignedIn = await GoogleSignin.isSignedIn();
      // if (isSignedIn) {
      // If signed in, sign out from Google

      await GoogleSignin.signOut();
      console.log('User signed out successfully');
      // Update your UI here, e.g., navigate to login screen
      // You might want to clear any local storage or state related to the user
      // } else {
      // console.log('User was not signed in');
      // }
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const onRegisterPressed = () => {
    navigation.navigate('Register');
    reset();
  };

  const onClickForgotPressed = () => {
    navigation.navigate('Forgot password');
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Title text="UniSign" type="Main" />
      </View>
      <View style={styles.inputView}>
        <CustomInput control={control} name="email" placeholder="Email" />
        <CustomInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <ClickableText
          onPress={onClickForgotPressed}
          text="Forgot Password?"
          type="Forgot"
        />
        {message ? <Message text={message} /> : null}
        <Button onPress={handleSubmit(onLoginPressed)} text="LOGIN" />
        <ExternalLoginButton
          onPress={onLoginGooglePressed}
          text="Login with Google"
          type="Google"
        />
        <ExternalLoginButton
          onPress={onLoginFacebookPressed}
          text="Login with Facebook"
          type="Facebook"
        />

        <ClickableText
          onPress={onRegisterPressed}
          text="Register"
          type="Register"
        />
      </View>
      <View style={{flex: 2}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  inputView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titleView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
