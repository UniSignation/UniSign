import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Title from '@/components/Text/Title'
import CustomInput from '@/components/CustomInput'
import { Button, ClickableText } from '@/components/Button'
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPassSchema, ResetPassInfo } from '../../schema/ResetPassSchema';
import { Message } from '@/components/Text';
import axios from 'axios';
const BASE_URL = 'http:/192.168.0.102:3000'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';

type ReportOfProblemRouteProp = RouteProp<RootStackParamList, 'Report of problem'>;
type ReportOfProblemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Report of problem'>;


type Props = {
    route: ReportOfProblemRouteProp;
};

const ReportOfProblemPage = ({ route }: Props) => {
    const [message, setMessage] = useState("");
    const navigation = useNavigation<ReportOfProblemNavigationProp>();
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const { email } = route.params;

    const onSendPressed = async () => {
        // try {
        //     const response = await axios.post(`${BASE_URL}/user/updatePassword`, { email, password });
        //     setMessage(response.data.message);
        //     navigation.navigate("Login");
        //     await axios.post(`${BASE_URL}/user/deleteCode`, { email });
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         setMessage(error.response?.data?.error || 'An error occurred');
        //     } else {
        //         setMessage('An unknown error occurred');
        //     }

        // }
    }
    const onBackPressed = async () => {
        // try {
        //     const response = await axios.post(`${BASE_URL}/user/codeMatch`, { email, code });
        //     await axios.post(`${BASE_URL}/user/updatePassword`, { email, password });
        //     setMessage(response.data.message);
        //     navigation.navigate("Home", {firstName,email});
        //     await axios.post(`${BASE_URL}/user/deleteCode`, { email });
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         setMessage(error.response?.data?.error || 'An error occurred');
        //     } else {
        //         setMessage('An unknown error occurred');
        //     }

        // }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.titleView}>
                <Title text='Report of problem' type='' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Subject*</Text>
                <View style={styles.inputView}>
                <TextInput
                    onChangeText={(subject) => setSubject(subject)}
                    style={styles.TextInput}
                />
                </View>
                {message ? <Message text={message} /> : null}
                {/* <Button onPress={onSendPressed} text='SEND' /> */}
                <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
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

    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontFamily: 'serif',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#f0d0aa",
        borderRadius: 30,
        height: 45,
        alignItems: "center",
        borderWidth: 1,
      },
});

export default ReportOfProblemPage