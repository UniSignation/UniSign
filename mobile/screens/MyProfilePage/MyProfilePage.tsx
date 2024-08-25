import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Title} from '../../components/Text';
import {ClickableImage, ClickableText, Button} from '../../components/Button';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../components/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Buffer} from 'buffer';

import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

type MyProfileRouteProp = RouteProp<RootStackParamList, 'My profile'>;
type MyProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'My profile'
>;

type Props = {
  route: MyProfileRouteProp;
};

const MyProfilePage = ({route}: Props) => {
  const navigation = useNavigation<MyProfileNavigationProp>();
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {email} = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${URL}/user/getUser`, {email});
        const user = response.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        if (user.profileImage && user.profileImage.data) {
          const base64String = Buffer.from(user.profileImage.data).toString(
            'base64',
          );
          setProfileImage(`data:image/jpeg;base64,${base64String}`);
        } else {
          setProfileImage(null); // Use null if no image
        }
      } catch (error) {
        console.error(`MyProfilePage ${URL}/user/getUser`)
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.error || 'An error occurred');
          console.log(message);
        } else {
          setMessage('An unknown error occurred');
          console.log(message);
        }
      }
    };

    fetchUser();
  }, [email]);

  const onEditPressed = () => {
    navigation.navigate('Edit profile', {email});
  };

  const onBackPressed = () => {
    if (email === 'UnisignAY@gmail.com') {
      navigation.navigate('HomeAdmin', {firstName, email});
    } else {
      navigation.navigate('Home', {firstName, email});
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}></View>
      <View style={styles.title}>
        <Title text="My profile" type="" />
      </View>
      <View style={styles.addPictureView}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : require('../../assets/images/profile.png')
          }
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 5, width: '100%', height: '100%'}}>
        <View style={styles.topPage}>
          <View style={styles.texts}>
            <Text style={styles.text}>First name: {firstName}</Text>
            <Text style={styles.text}>Last name: {lastName}</Text>
            <Text style={styles.text}>Email: {email}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button onPress={onEditPressed} text="Edit" />
          <ClickableText onPress={onBackPressed} text="Back" type="Forgot" />
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPictureView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topPage: {
    flex: 2,
    flexDirection: 'row',
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    color: '#443532',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  buttons: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100, // הגדרת רוחב התמונה
    height: 100, // הגדרת גובה התמונה
  },
});

export default MyProfilePage;
