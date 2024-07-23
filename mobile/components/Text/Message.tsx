import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Message = ({ text }: { text: string }) => {
    return (
        <View>
            <Text style={styles.message}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        marginTop: 20,
        textAlign: 'center',
        color: 'red',
      }
});

export default Message