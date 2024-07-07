import React from 'react';
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type CustomInputProps<T extends FieldValues> = {
  control: Control<T> ,
  name: Path<T>,
  placeholder: string,
  secureTextEntry?: boolean
}

const CustomInput = <T extends FieldValues>({ control, name, placeholder, secureTextEntry }: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <View style={styles.container}>
        <View style={[styles.inputView, { borderColor: error ? 'red' : "#f0d0aa" }]}>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            style={styles.TextInput}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
          />
        </View>
        {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#f0d0aa",
    borderRadius: 30,
    height: 45,
    alignItems: "center",
    borderWidth: 1,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontFamily: 'serif',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomInput;