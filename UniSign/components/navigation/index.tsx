import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '@/screens/LoginPage';
import RegisterPage from '@/screens/RegisterPage';
import HomePage from '@/screens/HomePage';
import ForgotPasswordPage from '@/screens/ForgotPasswordPage';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer theme={navTheme} independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Forgot password" component={ForgotPasswordPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;