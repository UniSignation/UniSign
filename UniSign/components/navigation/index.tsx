import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '@/screens/LoginPage';
import RegisterPage from '@/screens/RegisterPage';
import HomePage from '@/screens/HomePage';
import ForgotPasswordPage from '@/screens/ForgotPasswordPage';
import ResetPasswordPage from '@/screens/ResetPasswordPage';
import MyProfilePage from '@/screens/MyProfilePage';
import EditProfilePage from '@/screens/EditProfilePage';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  'Forgot password': undefined;
  Home: { firstName: string };
  'Reset password': {email: string};
  'My profile': undefined;
  'Edit profile': undefined;
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer theme={navTheme} independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Forgot password" component={ForgotPasswordPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Reset password" component={ResetPasswordPage} />
        <Stack.Screen name="My profile" component={MyProfilePage} />
        <Stack.Screen name="Edit profile" component={EditProfilePage} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;