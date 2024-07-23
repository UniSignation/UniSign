import { Controller, Control,FieldValues,Path } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

type ControlInputProps<T extends FieldValues> = {
    control: Control<T>,
    name: Path<T>
  } & React.ComponentProps<typeof TextInput>;
  
  export default function ControlInput<T extends FieldValues>({
    control,
    name,
    ...textInputProps
  }: ControlInputProps<T>) {
  

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <View style={styles.inputView}>
          <TextInput
            {...textInputProps}
            style={styles.TextInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          <HelperText type="error" visible={invalid}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
      fontFamily: 'serif',
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
  
  
    }
  });
  