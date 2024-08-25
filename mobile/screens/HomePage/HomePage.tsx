import {View, StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ClickableText, ClickableImage, Button} from '../../components/Button';
import {Title} from '../../components/Text';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../components/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {Buffer} from 'buffer';

const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {firstName, email} = route.params;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${URL}/user/getUser`, {email});
        const user = response.data;
        if (user.profileImage && user.profileImage.data) {
          const base64String = Buffer.from(user.profileImage.data).toString(
            'base64',
          );
          setProfileImage(`data:image/jpeg;base64,${base64String}`);
        } else {
          setProfileImage(null); // Use null if no image
        }
      } catch (error) {
        console.error(`HomePage ${URL}/user/getUser`)
        console.error(error);
      }
    };

    fetchUser();
  }, [email]);
  const onImagePressed = () => {
    navigation.navigate('My profile', {email});
  };
  const onTestPressed = () => {
    console.warn('Test press');
  };
  const onUsePressed = () => {
    navigation.navigate('Video', {email});
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
            url={
              profileImage
                ? {uri: profileImage}
                : require('../../assets/images/profile.png')
            }
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
