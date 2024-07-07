import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import {Title} from '@/components/Text'
import { ClickableImage, ClickableText, Button } from '@/components/Button'
import CustomInput from '@/components/CustomInput'
import { useNavigation } from '@react-navigation/native';

const EditProfilePage = () => {
    const navigation = useNavigation();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const onSavePressed = () => {
        console.warn("save press")

        navigation.navigate("My profile" as never);
    }

    const onBackPressed = () => {
        console.warn("back press")
        navigation.navigate("My profile" as never);

    }
    const onImagePressed = () => {
        console.warn("Image press")

    }
    const onChangePassPressed = () => {
        console.warn("Change password press")
        navigation.navigate("Reset password" as never);

    }
    const onDeletePressed = () => {
        console.warn("Delete user press")
        navigation.navigate("Login" as never);
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.title}>
                <Title text='Edit your profile' type='' />
            </View>
            <View style={{ flex: 7, width: "100%", height: "100%" }}>

                <View style={styles.addPictureView}>
                    <ClickableImage onPress={onImagePressed} url={require('@/assets/images/profile.png')} type='Big' />
                </View>
                <View style={styles.texts}>
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
                </View>
                <View style={styles.buttons}>
                    <ClickableText onPress={onChangePassPressed} text='Change password' type='Forgot' />
                    <Button onPress={onSavePressed} text='Save' />
                    <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
                </View>
            </View>
            <View style={styles.title}>
            <ClickableText onPress={onDeletePressed} text='Delete user' type='Forgot' />
            </View>
        </View>
    )
}

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
export default EditProfilePage