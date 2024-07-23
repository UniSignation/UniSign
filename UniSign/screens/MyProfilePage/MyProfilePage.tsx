import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Title } from '@/components/Text';
import { ClickableImage, ClickableText, Button } from '@/components/Button';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../components/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import axios from 'axios';

const BASE_URL = 'http://192.168.1.39:3000';

type MyProfileRouteProp = RouteProp<RootStackParamList, 'My profile'>;
type MyProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'My profile'>;

type Props = {
    route: MyProfileRouteProp;
};

const MyProfilePage = ({ route }: Props) => {
    const navigation = useNavigation<MyProfileNavigationProp>();
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { email } = route.params;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await axios.post(`${BASE_URL}/user/getUser`, { email });
                setFirstName(user.data.firstName);
                setLastName(user.data.lastName);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setMessage(error.response?.data?.error || 'An error occurred');
                } else {
                    setMessage('An unknown error occurred');
                }
            }
        };

        fetchUser();
    }, [email]);

    const onEditPressed = () => {
        navigation.navigate("Edit profile", {email});
    };

    const onBackPressed = () => {
        navigation.navigate("Home", {firstName, email});
    };

    const onImagePressed = () => {
        navigation.navigate("My profile", {email});
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.title}>
                <Title text='My profile' type='' />
            </View>
            <View style={styles.addPictureView}>
                <ClickableImage onPress={onImagePressed} url={require('@/assets/images/profile.png')} type='Big' />
            </View>
            <View style={{ flex: 5, width: "100%", height: "100%" }}>
                <View style={styles.topPage}>
                    <View style={styles.texts}>
                        <Text style={styles.text}>First name: {firstName}</Text>
                        <Text style={styles.text}>Last name: {lastName}</Text>
                        <Text style={styles.text}>Email: {email}</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <Button onPress={onEditPressed} text='Edit' />
                    <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'grey'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addPictureView: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    texts: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: 'pink' 
    },
    topPage: {
        flex: 2,
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    text: {
        marginBottom: 10,
        fontSize: 15,
        color: '#443532',
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    buttons: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MyProfilePage;
