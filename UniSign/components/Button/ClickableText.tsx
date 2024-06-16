import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

type ClickableTextProps = {
    onPress: () => void,
    text: string,
    type: StyleType
}

type StyleType = 'Register' | 'Forgot';

const ClickableText: React.FC<ClickableTextProps> = ({ onPress, text, type }) => {
    return (
        <Pressable onPress={onPress} >
            <Text style={styles[`text${type}`]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textRegister: {
        height: 30,
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#443532',
        fontFamily: 'serif',

    },
    textForgot: {
        height: 30,
        marginBottom: 30,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#443532',
        textDecorationLine: 'underline',
        fontFamily: 'serif',

    },
});
export default ClickableText