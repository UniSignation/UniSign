import { Pressable, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'

type ClickableImageProps = {
    onPress: () => void,
    url: ImageSourcePropType,
    type?: string
}

const ClickableImage: React.FC<ClickableImageProps> = ({ onPress, url, type }) => {
    return (
        <Pressable onPress={onPress}>
            <Image style={styles.image}
                source={url} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24
    }
})

export default ClickableImage