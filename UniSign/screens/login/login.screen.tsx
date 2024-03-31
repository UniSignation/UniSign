import React, { useState } from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";

export const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <ImageBackground style = {styles.image}
            source= {require('../../assets/Background.png')}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#8B6862"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#8B6862"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn}>
          <Text>LOGIN</Text> 
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.register_button}>Register</Text> 
        </TouchableOpacity> 
        </ImageBackground>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
        width: "100%",
        height:"100%",
        alignItems: "center",
        justifyContent: "center"
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
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
      fontSize: 16,
      fontWeight: 'bold'
    },
    register_button: {
        height: 30,
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold'
      },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#f0c99c",
    },
  });