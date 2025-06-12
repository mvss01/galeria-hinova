import { Feather } from "@expo/vector-icons"
import React from "react"
import { Pressable } from "react-native"
import { styles } from "./styles"
interface HomeHeaderProps {
    onPress: () => void
}

export const CameraButton = ({onPress}: HomeHeaderProps) => {
    return (
        <Pressable onPress={onPress} style={styles.floatingButton}>
            <Feather name="camera" size={24} color="#fff" />
        </Pressable>
    )
}
