import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Title from '@/components/Text'
import { ClickableImage, ClickableText, Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native';


const MyProfilePage = () => {
    const navigation = useNavigation();

    const onEditPressed = () => {
        console.warn("edit press")

        navigation.navigate("Edit profile" as never);
    }

    const onBackPressed = () => {
        console.warn("back press")
        navigation.navigate("Home" as never);

    }
    const onImagePressed = () => {

        navigation.navigate("My profile" as never);

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.title}>
                <Title text='My profile' type='' />
            </View>
            <View style={{ flex: 5, width: "100%", height: "100%" }}>
                <View style={styles.topPage}>
                    <View style={styles.texts}>
                        <Text style={styles.text}>First name: </Text>
                        <Text style={styles.text}>Last name: </Text>
                        <Text style={styles.text}>Email: </Text>
                    </View>
                    <View style={styles.addPictureView}>
                        <ClickableImage onPress={onImagePressed} url={require('@/assets/images/profile.png')} type='Big' />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <Button onPress={onEditPressed} text='Edit' />
                    <ClickableText onPress={onBackPressed} text='Back' type='Forgot' />
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
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

export default MyProfilePage