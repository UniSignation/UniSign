import LoginScreen from '@/screens/LoginPage';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import UniSignBackground from '@/components/Background';

export default function HomeScreen() {
  return (
    <UniSignBackground>
        <LoginScreen />
    </UniSignBackground>
  );
}

const styles = StyleSheet.create({

});
