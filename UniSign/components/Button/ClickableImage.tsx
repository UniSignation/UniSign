import { Pressable, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'

type ClickableImageProps = {
    onPress: () => void,
    url: ImageSourcePropType,
    type: StyleType
}

type StyleType = 'Big'|'Small' | 'Circle';

const ClickableImage: React.FC<ClickableImageProps> = ({ onPress, url, type }) => {
    return (
        <Pressable onPress={onPress}>
            <Image style={styles[`image${type}`]}
                source={url} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageSmall: {
        width: 24,
        height: 24
    },
    imageBig: {
        width: 120,
        height: 120
    },
    imageCircle: {
        width: 80,
        height: 80, 
        borderRadius: 50, 
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default ClickableImage