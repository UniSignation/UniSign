import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

type ButtonProps = {
    onPress: () => void,
    text: string
}

const Button: React.FC<ButtonProps> = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
container:{
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0c99c",
    marginVertical: 10
},
});

export default Button