import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Title, Message } from '@/components/Text'
import CustomInput from '@/components/CustomInput'
import { Button, ClickableText } from '@/components/Button'
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPassSchema, ForgotPassInfo } from '../../schema/ForgotPassSchema';
import axios from 'axios';
const BASE_URL = 'http:/192.168.0.103:3000'

const ForgotPasswordPage = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState("");


    const { control, handleSubmit } = useForm<ForgotPassInfo>({
        resolver: zodResolver(ForgotPassSchema),
    });

    const onSendPressed = async (data: ForgotPassInfo) => {
        const { email } = data;
        try {
            const response = await axios.post(`${BASE_URL}/user/sendEmail`, { email });
            setMessage(response.data.message);
            navigation.navigate("Reset password" as never);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'An error occurred');
            } else {
                setMessage('An unknown error occurred');
            }

        }
    }

    const onLoginPressed = () => {
        navigation.navigate("Login" as never);

    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.titleView}>
                <Title text='Reset your password' type='' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Email *</Text>
                <CustomInput
                    control={control}
                    name="email"
                    placeholder="enter your email"
                />
                {message ? <Message text={message} /> : null}
                <Button onPress={handleSubmit(onSendPressed)} text='SEND' />
                <ClickableText onPress={onLoginPressed} text='Back to Login' type='Forgot' />
            </View>
            <View style={{ flex: 4 }}></View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleView: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        flex: 3,
        width: '100%',
        alignItems: "center",
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#443532',

    }
});
export default ForgotPasswordPage