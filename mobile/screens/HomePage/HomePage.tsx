import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {ClickableText, ClickableImage, Button} from '../../components/Button';
import {Title} from '../../components/Text';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../components/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
const BASE_URL = 'http:/192.168.1.39:3000';
type HomePageRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  route: HomePageRouteProp;
};

const HomePage = ({route}: Props) => {
  const navigation = useNavigation<HomePageNavigationProp>();

  const {firstName, email} = route.params;

  const onImagePressed = () => {
    navigation.navigate('My profile', {email});
  };
  const onTestPressed = () => {
    console.warn('Test press');
  };
  const onUsePressed = () => {
    navigation.navigate('Video');
   
  };
  const onInstructionPressed = () => {
    console.warn('Instruction press');
  };
  const onReportPressed = () => {
    navigation.navigate('Report of problem', {email});
  };
  const onSignOutPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.mainView}>
      <View style={{flex: 1}}></View>
      <View style={styles.topPage}>
        <View style={styles.title}>
          <Title text={`Hi ${firstName}!`} type="" />
        </View>
        <View style={styles.addPictureView}>
          <ClickableImage
            onPress={onImagePressed}
            url={require('../../assets/images/profile.png')}
            type="Circle"
          />
          <Text style={styles.textPhoto}>My profile</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button onPress={onTestPressed} text="Test service" />
        <Button onPress={onUsePressed} text="Use service" />
        <Button onPress={onInstructionPressed} text="Instruction" />
        <Button onPress={onReportPressed} text="Report of problem" />
      </View>
      <View style={styles.bottomPage}>
        <ClickableText
          onPress={onSignOutPressed}
          text="Sign out"
          type="Forgot"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'grey'
  },
  textPhoto: {
    fontSize: 15,
    color: '#443532',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  addPictureView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  title: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink'
  },
  topPage: {
    flex: 2,
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  bottomPage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomePage;
