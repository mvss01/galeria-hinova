import { Feather } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { Image, Linking, Pressable, Text, View } from "react-native";
import Maps from "../../../assets/maps.png";
import { styles } from "./style";

interface PhotoDetailProps {
    data: string;
    longitude: number;
    latitude: number;
}

export const PhotoDetail = ({ data, longitude, latitude }: PhotoDetailProps) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{data}</Text>
            <View style={{flexDirection: "row"}}>
                <View style={{marginEnd: "auto"}}>
                    <Text style={styles.label}>Latitude:</Text>
                    <View style={styles.coordinate}>
                        <Text style={styles.value}>{latitude}</Text>
                        <Pressable onPress={() => Clipboard.setStringAsync(`${latitude}`)}>
                            <Feather name="copy" size={20} color={"#00000086"}/>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Longitude:</Text>
                    <View style={styles.coordinate}>
                        <Text style={styles.value}>{longitude}</Text>
                        <Pressable onPress={() => Clipboard.setStringAsync(`${longitude}`)}>
                            <Feather name="copy" size={20} color={"#00000086"}/>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Text style={styles.label}>Mapa</Text>
            <Pressable onPress={() => Linking.openURL(mapsUrl)}>
                <Image
                    source={Maps}
                    style={styles.image}
                />
            </Pressable>
        </View>
    );
};
