import { Text, View } from "react-native";
import { styles } from "./style";

interface PhotoDetailProps {
    data: string;
    longitude: number;
    latitude: number;
}

export const PhotoDetail = ({ data, longitude, latitude }: PhotoDetailProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{data}</Text>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{longitude}</Text>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{latitude}</Text>
        </View>
    );
};
