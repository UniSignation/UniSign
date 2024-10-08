import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginPage from '../../screens/LoginPage';
import RegisterPage from '../../screens/RegisterPage';
import HomePage from '../../screens/HomePage';
import ForgotPasswordPage from '../../screens/ForgotPasswordPage';
import ResetPasswordPage from '../../screens/ResetPasswordPage';
import MyProfilePage from '../../screens/MyProfilePage';
import VideoRouterPage from '../../screens/VideoRouterPage';
import EditProfilePage from '../../screens/EditProfilePage';
import ReportOfProblemPage from '../../screens/ReportOfProblemPage';
import HomeAdminPage from '../../screens/HomeAdminPage';
import UsersTablePage from '../../screens/UsersTablePage';
import EditUsersPage from '../../screens/EditUsersPage';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  'Forgot password': undefined;
  Home: {firstName: string; email: string};
  'Reset password': {email: string};
  'My profile': {email: string};
  'Edit profile': {email: string};
  'Report of problem': {email: string};
  Video: {email: string};
  HomeAdmin: {firstName: string; email: string};
  'Users Table': {users: any; firstName: string; email: string};
  'Edit Users': {users: any; firstName: string; email: string};
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="My profile" component={MyProfilePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Forgot password" component={ForgotPasswordPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Reset password" component={ResetPasswordPage} />
        <Stack.Screen name="Edit profile" component={EditProfilePage} />
        <Stack.Screen name="Report of problem" component={ReportOfProblemPage} />
        <Stack.Screen name="Video" component={VideoRouterPage} />
        <Stack.Screen name="HomeAdmin" component={HomeAdminPage} />
        <Stack.Screen name="Users Table" component={UsersTablePage} />
        <Stack.Screen name="Edit Users" component={EditUsersPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
