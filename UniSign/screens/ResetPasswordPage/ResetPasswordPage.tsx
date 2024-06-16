import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Title from '@/components/Text/Title'
import CustomInput from '@/components/CustomInput'
import { Button, ClickableText } from '@/components/Button'
import { useNavigation } from '@react-navigation/native';

const ResetPasswordPage = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [reppassword, setRepPassword] = useState("");

    const onSendPressed = () => {
        console.warn("send")
    }

    const onLoginPressed = () => {
        console.warn("Login")

        navigation.navigate("Login" as never);

    }
    const onSendAgainPressed = () => {
        console.warn("send again")

    }
    return (
        <View style={styles.container}>
            <Title text='Reset your password' type='' />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#443532', marginBottom: 5 }}>Code*</Text>
            <CustomInput
                placeholder="Enter your code"
                value={code}
                setValue={setCode}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 15, color: '#443532' }}>Didn't get a code?</Text>
                <ClickableText onPress={onSendAgainPressed} text='send again!' type='Forgot' />
            </View>
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="Repeat Password"
                value={reppassword}
                setValue={setRepPassword}
                secureTextEntry={true}
            />
            <Button onPress={onSendPressed} text='SEND' />
            <View style={{ height: 10 }}></View>
            <ClickableText onPress={onLoginPressed} text='Back to Login' type='Forgot' />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: '100%',
        alignItems: "center",
        flexDirection: 'column',
    },
});

export default ResetPasswordPage