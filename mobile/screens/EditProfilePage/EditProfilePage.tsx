import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Title } from '../../components/Text';
import { ClickableImage, ClickableText, Button } from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileSchema, EditProfileInfo } from '../../schema/editProfileSchema';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';

const EditProfilePage = () => {
    const { control, handleSubmit, reset } = useForm<EditProfileInfo>({
        resolver: zodResolver(EditProfileSchema),
    });

    const navigation = useNavigation();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const onSavePressed = () => {
        console.warn("save press");
        navigation.navigate("My profile" as never);
    };

    const onBackPressed = () => {
        console.warn("back press");
        navigation.navigate("My profile" as never);
    };

    const onImagePressed = () => {
        console.warn("Image press");
    };

    const onChangePassPressed = () => {
        console.warn("Change password press");
        navigation.navigate("Reset password" as never);
    };

    const onDeletePressed = () => {
        console.warn("Delete user press");
        navigation.navigate("Login" as never);
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Title text='Edit your profile' type='' />
            </View>
            <ScrollView style={{ flex: 3, width: "100%", height: "100%" ,backgroundColor: 'pink'}}>
                <View style={styles.addPictureView}>
                    <ClickableImage onPress={onImagePressed} url={require('../../assets/images/profile.png')} type='Big' />
                </View>
                <View style={styles.texts}>
                    <CustomInput
                        control={control}
                        name="firstName"
                        placeholder="First name"
                    />
                    <CustomInput
                        control={control}
                        name="lastName"
                        placeholder="Last Name"
                    />
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
                    <CustomInput
                        control={control}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttons}>
                    <Button onPress={onSavePressed} text='Save' />
                    <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
                </View>
                <View style={styles.title}>
                    <ClickableText onPress={onDeletePressed} text='Delete user' type='Forgot' />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'grey'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'

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
