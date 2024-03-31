import React, { useState } from 'react';
import { ImageBackground, Pressable, SafeAreaView, Touchable } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { Flex, Radio} from '@ant-design/react-native'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

export const RegisterScreen = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reppassword, setRepPassword] = useState("");
    type RadioValue = string | number
    interface EventRadioGroup {
        target: { value: RadioValue }
      }
    //   onGroupChange2 = (e: EventRadioGroup) => {
    //     this.setState({
    //       part2Value: e.target.value,
    //     })
    //   }
    return (
        <View style={styles.container}>
            <ImageBackground style = {styles.image}
            source= {require('../../assets/Background.png')}>
        <StatusBar style="auto" />
        <View>
        <Title style={styles.title}>Create an account</Title>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#8B6862"
            onChangeText={(firstname) => setFirstName(firstname)}
          /> 
        </View> 
        <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#8B6862"
            onChangeText={(lastname) => setLastName(lastname)}
          /> 
        </View> 
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Repeat Password"
            placeholderTextColor="#8B6862"
            secureTextEntry={true}
            onChangeText={(reppassword) => setRepPassword(reppassword)}
          /> 
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
        <TouchableOpacity>
        <Image style={{width:60, height: 25 }}
            resizeMode='contain'
            source= {require('../../assets/addphoto.png')}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 16,fontWeight: 'bold'}}>Add a profile picture</Text>
        </View>
        <Radio.Group
            // onChange={this.onGroupChange2}
            // value={this.state.part2Value}
            defaultValue={1}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 6,
         
            }}>
            <Radio value={1} ><Text style={styles.text_Radio}>Sign Language</Text></Radio>
            <Radio value={2}><Text style={styles.text_Radio}>Spoken Language</Text></Radio>
          </Radio.Group> 
        <TouchableOpacity style={styles.register_button}>
          <Text>REGISTER</Text> 
        </TouchableOpacity>

        <View style={{display:'flex',flexDirection:'row'}}>
          <Text style={{ fontSize: 15}}>Already have an account?</Text>
            <TouchableOpacity>
            <Text style={{ fontSize: 16,fontWeight: 'bold'}}>  LOGIN</Text> 
            </TouchableOpacity>
        </View>

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
      width: "65%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
    Login_button: {
        height: 30,
        marginBottom: 30,
        fontSize: 16,
        fontWeight: 'bold'
      },
    register_button: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      backgroundColor: "#f0c99c",
    },
    title:{
        height: 80,
        marginBottom: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_Radio:{
        fontSize: 16,
        fontWeight: 'bold'
    },
  });