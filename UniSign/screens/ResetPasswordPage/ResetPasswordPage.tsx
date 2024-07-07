import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Title from '@/components/Text/Title'
import CustomInput from '@/components/CustomInput'
import { Button, ClickableText } from '@/components/Button'
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPassSchema, ResetPassInfo } from '../../schema/ResetPassSchema';
import axios from 'axios';
const BASE_URL = 'http://192.168.1.42:3000'

const ResetPasswordPage = () => {
    const navigation = useNavigation();
    const [timeRemaining, setTimeRemaining] = useState(300); // 300 seconds = 5 minutes
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
          setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);
    
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, []);
    
      useEffect(() => {
        if (timeRemaining <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, [timeRemaining]);
    

    const { control, handleSubmit } = useForm<ResetPassInfo>({
        resolver: zodResolver(ResetPassSchema),
    });

    const onSendPressed = () => {
        console.warn("send")
    }

    const onLoginPressed = () => {
        navigation.navigate("Login" as never);

    }
    const onSendAgainPressed = () => {
        console.warn("send again")

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.titleView}>
                <Title text='Reset your password' type='' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Code*</Text>
                <CustomInput
                    control={control}
                    name='code'
                    placeholder="Enter your code"
                />
                 <Text style={{ fontSize: 15, color: '#443532', fontWeight:'bold' }}>Time remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, color: '#443532' }}>Didn't get a code?</Text>
                    <ClickableText onPress={onSendAgainPressed} text='send again!' type='Forgot' />
                </View>
                <CustomInput
                    control={control}
                    name='password'
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <CustomInput
                    control={control}
                    name='confirmPassword'
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
                <Button onPress={handleSubmit(onSendPressed)} text='SEND' />
                <ClickableText onPress={onLoginPressed} text='Back to Login' type='Forgot' />
            </View>
            <View style={{ flex: 5 }}></View>

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

export default ResetPasswordPage