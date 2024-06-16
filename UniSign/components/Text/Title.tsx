import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type StyleType = 'Main' | '';

const Title = ({ text, type }: { text: string, type: StyleType }) => {
  return (
    <View>
      <Text style={[styles.title, styles[`title${type}`]]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    // height: 80,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#443532',
    fontFamily: 'serif'

  },
  titleMain: {
    fontFamily: 'serif',
    fontSize: 45,
    fontWeight: 'bold',
    color: '#443532'
  },
});

export default Title