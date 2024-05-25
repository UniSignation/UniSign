import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Title = ({text}:{text : string}) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
title:{
    height: 80,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#443532'
},
});

export default Title