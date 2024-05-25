import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Title from '@/components/Text/Title'
import CustomInput from '@/components/CustomInput'
import { Button, ClickableText } from '@/components/Button'
import { useNavigation } from '@react-navigation/native';
import UniSignBackground from '@/components/Background/UniSignBackground'


const ForgotPasswordPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");

    const onSendPressed = () => {
        console.warn("send")
    }

    const onLoginPressed = () => {
        console.warn("Login")

        navigation.navigate("Login" as never);

    }

    return (
        <View style={styles.container}>
            <Title text='Reset your password' />
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#443532', marginBottom: 5 }}>Email *</Text>
                <CustomInput
                    placeholder="enter your email"
                    value={email}
                    setValue={setEmail}
                />
            </View>
            <Button onPress={onSendPressed} text='SEND' />
            <View style={{height: 10}}></View>
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
        marginBottom: 70
    },
});
export default ForgotPasswordPage