import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Title } from '../../components/Text';
import { ClickableImage, ClickableText, Button } from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileSchema, EditProfileInfo } from '../../schema/editProfileSchema';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

type EditProfileRouteProp = RouteProp<RootStackParamList, 'Edit profile'>;
type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Edit profile'>;

type Props = {
    route: EditProfileRouteProp;
};

const EditProfilePage = ({ route }: Props) => {
    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
    const [message, setMessage] = useState("");

    const { control, handleSubmit, reset } = useForm<EditProfileInfo>({
        resolver: zodResolver(EditProfileSchema),
    });

    const { email } = route.params;
    const navigation = useNavigation<EditProfileNavigationProp>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post(`${URL}/user/getUser`, { email });
                setUser(response.data);
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

    const onSavePressed = async (data: EditProfileInfo) => {
        const { firstName, lastName } = data;
        try {
            const response = await axios.post(`${URL}/user/updateUser`, { firstName, lastName, email});
            setMessage(response.data.message);
            navigation.navigate("Home", { firstName, email });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'An error occurred');
            } else {
                setMessage('An unknown error occurred');
            }

        }
    };

    const onBackPressed = () => {
        navigation.navigate("My profile", { email });
    };

    const onImagePressed = () => {
        console.warn("Image press");
    };

    const onChangePassPressed = async () => {
        try {
            await axios.post(`${URL}/user/getUser`, { email });
            const response = await axios.post(`${URL}/user/sendEmail`, { email });
            setMessage(response.data.message);
        navigation.navigate("Reset password", { email });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setMessage(error.response?.data?.error || 'An error occurred');
        } else {
            setMessage('An unknown error occurred');
        }
    }
    };

    const onDeletePressed  = async () => {
        try {
            const response = await axios.post(`${URL}/user/deleteUser`, { email });
            setMessage(response.data.message);
        navigation.navigate("Login");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setMessage(error.response?.data?.error || 'An error occurred');
        } else {
            setMessage('An unknown error occurred');
        }
    }
    };

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.title}>
                <Title text='Edit your profile' type='' />
            </View>
            <View style={{ flex: 8, width: "100%", height: "100%" }}>
                <View style={styles.addPictureView}>
                    <ClickableImage onPress={onImagePressed} url={require('../../assets/images/profile.png')} type='Big' />
                </View>
                <View style={styles.texts}>
                    <CustomInput
                        control={control}
                        name="firstName"
                        placeholder={user.firstName}
                    />
                    <CustomInput
                        control={control}
                        name="lastName"
                        placeholder={user.lastName}
                    />
                </View>
                <View style={styles.buttons}>
                    <ClickableText onPress={onChangePassPressed} text='Change password' type='Forgot' />
                    <Button onPress={handleSubmit(onSavePressed)} text='Save' />
                    <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
                </View>
            </View>
            <View style={styles.title}>
                <ClickableText onPress={onDeletePressed} text='Delete user' type='Forgot' />
            </View>
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
        flex: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    texts: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: 'pink' 
    },
    text: {
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

export default EditProfilePage;