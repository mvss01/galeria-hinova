import { Image, Text, View } from "react-native";
import Arrow from "../../../assets/handmade-arrow.png";
import { styles } from "./styles";

export const PhotosEmpty = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Tire sua primeira fotografia.</Text>
            <Image source={Arrow} style={styles.arrow} resizeMode="contain" />
        </View>
    )
}
