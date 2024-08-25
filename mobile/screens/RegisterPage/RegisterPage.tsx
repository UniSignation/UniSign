import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import {
  Button,
  ClickableText,
  ClickableImage,
  RadioButton,
} from '../../components/Button';
import {Title, Message} from '../../components/Text';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RegisterSchema, RegisterInfo} from '../../schema/registerSchema';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../components/navigation';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterPage = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [message, setMessage] = useState('');
  const [usesService, setSelectedValue] = useState('True');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const {control, handleSubmit} = useForm<RegisterInfo>({
    resolver: zodResolver(RegisterSchema),
  });

  const options = [
    {label: 'Sign Language', value: 'True'},
    {label: 'Spoken Language', value: 'False'},
  ];

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset: Asset = response.assets[0];
          setImageUri(asset.uri || null);
        }
      },
    );
  };

  const onRegisterPressed = async (data: RegisterInfo) => {
    console.log('onRegisterPressed')
    console.log(`${URL}/user/sign-up`)
    const {firstName, lastName, email, password} = data;
    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('usesService', usesService);
    if (imageUri) {
      formData.append('profileImage', {
        uri: imageUri,
        type: 'image/jpeg', // Adjust the type based on the image format
        name: 'profile.jpg',
      });
    }
    try {
      const response = await axios.post(`${URL}/user/sign-up`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      navigation.navigate('Home', {firstName, email});
    } catch (error) {
      console.error('ERROR', error);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const onLoginPressed = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Title text="Create an account" type="" />
      </View>
      <View style={styles.inputView}>
        <CustomInput
          control={control}
          name="firstName"
          placeholder="First name"
        />
        <CustomInput
          control={control}
          name="lastName"
          placeholder="Last Name"
        />
        <CustomInput control={control} name="email" placeholder="Email" />
        <CustomInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <CustomInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm password"
          secureTextEntry={true}
        />
        <View style={styles.addPictureView}>
          <ClickableImage
            onPress={pickImage}
            url={
              imageUri
                ? {uri: imageUri}
                : require('../../assets/images/addphoto.png')
            }
            type="Small"
          />
          <Text style={styles.textPicture}>Add a profile picture</Text>
        </View>

        <RadioButton
          options={options}
          selectedValue={usesService}
          onValueChange={setSelectedValue}
        />
        {message ? <Message text={message} /> : null}
        <Button onPress={handleSubmit(onRegisterPressed)} text="Register" />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 15, color: '#443532'}}>
            Already have an account?
          </Text>
          <ClickableText onPress={onLoginPressed} text="LOGIN" type="Forgot" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPictureView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textPicture: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#443532',
  },
});

export default RegisterPage;
