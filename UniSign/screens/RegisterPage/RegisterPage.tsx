import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText, ClickableImage, RadioButton } from '../../components/Button';
import { Title, Message } from '@/components/Text';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterInfo } from '@/schema/registerSchema';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';

const BASE_URL = 'http:/192.168.0.103:3000'
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

    const onImagePressed = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };


    const onRegisterPressed = async (data: RegisterInfo) => {
        const { firstName, lastName, email, password } = data;
        try {
            const response = await axios.post(`${BASE_URL}/user/sign-up`, { firstName, lastName, email, password, usesService });
            setMessage(response.data.message);
            navigation.navigate("Home", { firstName });
        } catch (error) {
            console.error(error)
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
                    <ClickableImage onPress={onImagePressed} url={require('@/assets/images/addphoto.png')} type='Small' />
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

export default RegisterPage

