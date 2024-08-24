import {View, StyleSheet, Text} from 'react-native';
import React, { useState } from 'react';
import {ClickableText, ClickableImage, Button} from '../../components/Button';
import {Title, Message} from '../../components/Text';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../components/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;
type HomeAdminPageRouteProp = RouteProp<RootStackParamList, 'HomeAdmin'>;
type HomeAdminPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeAdmin'
>;

type Props = {
  route: HomeAdminPageRouteProp;
};

const HomeAdminPage = ({route}: Props) => {
  const navigation = useNavigation<HomeAdminPageNavigationProp>();
  const [message, setMessage] = useState("");

  const {firstName, email} = route.params;

  const onImagePressed = () => {
    navigation.navigate('My profile', {email});
  };

  const onUsersPressed = async () => {
  try {
      const response = await axios.get(`${URL}/user/getAllUser`, );
      
      setMessage(response.data.message);
      const users = response.data; 
      navigation.navigate("Users Table", { users ,firstName, email});
  } catch (error) {
      if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.error || 'An error occurred');
      } else {
          setMessage('An unknown error occurred');
      }
  }
}

  const onStatisticsPressed = () => {
    console.warn('Instruction press');
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
      {message ? <Message text={message} /> : null}

      <View style={styles.buttons}>
        <Button onPress={onUsersPressed} text="Users" />
        <Button onPress={onStatisticsPressed} text="Statistics" />
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
    flex: 4,
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
export default HomeAdminPage;
