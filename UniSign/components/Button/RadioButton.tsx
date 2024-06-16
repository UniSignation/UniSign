import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RadioButtonProps = {
    options: { label: string, value: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ options, selectedValue, onValueChange }) => {
    return (
        <View style={styles.container}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.optionContainer}
                    onPress={() => onValueChange(option.value)}
                >
                    <View style={styles.radioButton}>
                        {selectedValue === option.value && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.label}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    radioButton: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#8b6862',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#8b6862',
    },
    label: {
        fontSize: 16,
        color: '#443532',
        fontWeight: 'bold',
        fontFamily: 'serif',

    },
});

export default RadioButton;
