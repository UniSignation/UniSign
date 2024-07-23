import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText } from '../../components/Button';
import { Title, Message } from '@/components/Text';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInfo } from '@/schema/loginSchema';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';

import axios from 'axios';
const BASE_URL = 'http:/192.168.0.103:3000'


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [message, setMessage] = useState("");
    
    const { control, handleSubmit, reset } = useForm<LoginInfo>({
        resolver: zodResolver(LoginSchema),
    });


    const onLoginPressed = async (data: LoginInfo) => {
        const { email, password } = data;
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
            setMessage(response.data.message);
            const user = await axios.post(`${BASE_URL}/user/getUser`, { email });
            const firstName= user.data.firstName;
            navigation.navigate("Home", {firstName});
            reset()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'An error occurred');
            } else {
                setMessage('An unknown error occurred');
            }
        }
    };

    const onRegisterPressed = () => {
        navigation.navigate("Register" );
        reset()
    }
    const onClickForgotPressed = () => {
        navigation.navigate("Forgot password" )
        reset()
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Title text='UniSign' type='Main' />
            </View>
            <View style={styles.inputView}>
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
                <ClickableText
                    onPress={onClickForgotPressed}
                    text='Forgot Password?'
                    type='Forgot'
                />
                {message ? <Message text={message} /> : null}
                <Button
                    onPress={handleSubmit(onLoginPressed)}
                    text='LOGIN'
                />
                <ClickableText
                    onPress={onRegisterPressed}
                    text='Register'
                    type='Register'
                />
            </View>
            <View style={{ flex: 2 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    inputView: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    titleView: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default LoginScreen;