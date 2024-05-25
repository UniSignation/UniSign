import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText } from '../../components/Button';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginPressed = () => {
        console.warn("Sign in")

        navigation.navigate("Home" as never);

    }
    const onRegisterPressed = () => {
        console.warn("Sign up")
        
        navigation.navigate("Register" as never);
    }
    const onClickForgotPressed = () => {
        console.warn("forgot password")

        navigation.navigate("Forgot password" as never);
    }

    return (
        <View style={styles.container}>
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <ClickableText
                onPress={onClickForgotPressed}
                text='Forgot Password?'
                type='Forgot'
            />
            <Button
                onPress={onLoginPressed}
                text='LOGIN'
            />
            <ClickableText
                onPress={onRegisterPressed}
                text='Register'
                type='Register'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    }
});

export default LoginScreen;