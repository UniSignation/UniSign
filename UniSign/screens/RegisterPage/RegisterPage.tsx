import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { Button, ClickableText, ClickableImage, RadioButton } from '../../components/Button';
import Title from '@/components/Text';

const RegisterPage = () => {
    const navigation = useNavigation();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reppassword, setRepPassword] = useState("");

    const [selectedValue, setSelectedValue] = useState("Sign Language");

    const options = [
        { label: 'Sign Language', value: 'Sign Language' },
        { label: 'Spoken Language', value: 'Spoken Language' },
    ];

    const onImagePressed = () => {
        console.warn("Image press")
    }

    const onRegisterPressed = () => {
        console.warn("Register")

        navigation.navigate("Home" as never);
    }
    const onLoginPressed = () => {
        console.warn("Sign in")

        navigation.navigate("Login" as never);
    }
    return (
        <View style={styles.container}>
            <Title text='Create an account' type='' />
            <CustomInput
                placeholder="First Name"
                value={firstname}
                setValue={setFirstName}
            />
            <CustomInput
                placeholder="Last Name"
                value={lastname}
                setValue={setLastName}
            />
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
            <CustomInput
                placeholder="Repeat Password"
                value={reppassword}
                setValue={setRepPassword}
                secureTextEntry={true}
            />
            <View style={styles.addPictureView}>
                <ClickableImage onPress={onImagePressed} url={require('@/assets/images/addphoto.png')} type='Small'/>
                <Text style={{ paddingLeft: 10, fontSize: 17, fontWeight: 'bold', color: '#443532' }}>Add a profile picture</Text>
            </View>

            <RadioButton
                options={options}
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
            />
            <Button
                onPress={onRegisterPressed}
                text='Register'
            />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ fontSize: 15, color: '#443532' }}>Already have an account?</Text>
                <ClickableText onPress={onLoginPressed} text='LOGIN' type='Forgot' />
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
    addPictureView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 10
    }
});

export default RegisterPage

