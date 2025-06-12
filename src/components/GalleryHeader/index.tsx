import { Text, View } from "react-native"
import { styles } from "./styles"

export const GalleryHeader = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Galeria</Text>
            </View>
        </View>
    )
}
