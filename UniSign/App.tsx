/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { LoginScreen } from './screens/login/login.screen';
import { RegisterScreen } from './screens/register/register.screen';

const App = () => {
  return (
    <PaperProvider>
      <RegisterScreen/>
    </PaperProvider>
  )
}


export default App;
