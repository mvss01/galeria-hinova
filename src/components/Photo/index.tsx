import { Image, View } from "react-native"
import { styles } from "./styles"

type PhotoProps = {
    uri: string
}

export const PhotoComponent = ({ uri }: PhotoProps) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={styles.photo} />
        </View>
    )
}
