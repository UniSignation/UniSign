import React from 'react';
import { StyleSheet, View, TextInput } from  "react-native";

type CustomInputProps = {
  value: string,
  setValue: (text: string) => void, 
  placeholder: string,
  secureTextEntry?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ value, setValue, placeholder, secureTextEntry }) => {

    return (
        <View style={styles.inputView}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.TextInput}
                secureTextEntry={secureTextEntry}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inputView: {
      backgroundColor: "#f0d0aa",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    }
  });

export default CustomInput;