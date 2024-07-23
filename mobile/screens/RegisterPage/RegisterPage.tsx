import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText, ClickableImage, RadioButton } from '../../components/Button';
import { Title, Message } from '../../components/Text';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterInfo } from '../../schema/registerSchema';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';
import { launchImageLibrary } from 'react-native-image-picker';

const BASE_URL = 'http://192.168.1.39:3000';
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterPage = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const [message, setMessage] = useState("");
    const [usesService, setSelectedValue] = useState("True");
    const [image, setImage] = useState<string | null>(null);

    const { control, handleSubmit } = useForm<RegisterInfo>({
        resolver: zodResolver(RegisterSchema),
    });

    const options = [
        { label: 'Sign Language', value: 'True' },
        { label: 'Spoken Language', value: 'False' },
    ];

    const onImagePressed = () => {
        const options = {
            mediaType: 'photo' as const,
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const source = response.assets[0].uri;
                if (source) {
                    setImage(source);
                } else {
                    console.log('Image URI is undefined');
                }
            }
        });
    };

    const onRegisterPressed = async (data: RegisterInfo) => {
        const { firstName, lastName, email, password } = data;
        try {
            const response = await axios.post(`${BASE_URL}/user/sign-up`, { firstName, lastName, email, password, usesService, profileImage: image });
            setMessage(response.data.message);
            navigation.navigate("Home", { firstName, email });
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'An error occurred');
            } else {
                setMessage('An unknown error occurred');
            }
        }
    };

    const onLoginPressed = () => {
        navigation.navigate("Login" as never);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Title text='Create an account' type='' />
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
                <CustomInput
                    control={control}
                    name="email"
                    placeholder="Email"
                />
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
                    <ClickableImage onPress={onImagePressed} url={image ? { uri: image } : require('@/assets/images/addphoto.png')} type='Small' />
                    <Text style={styles.textPicture}>Add a profile picture</Text>
                </View>

                <RadioButton
                    options={options}
                    selectedValue={usesService}
                    onValueChange={setSelectedValue}
                />
                {message ? <Message text={message} /> : null}
                <Button
                    onPress={handleSubmit(onRegisterPressed)}
                    text='Register'
                />
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, color: '#443532' }}>Already have an account?</Text>
                    <ClickableText onPress={onLoginPressed} text='LOGIN' type='Forgot' />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    titleView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    addPictureView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    textPicture: {
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#443532'
    }
});

export default RegisterPage;