import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type PhotoHeaderProps = {
    onClick: () => void;
};

export const PhotoHeader = ({ onClick }: PhotoHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => onClick()}
                    style={styles.side}
                >
                    <AntDesign name="left" size={32} color="#0a85ff" />
                </Pressable>
                <Text style={styles.title}>Detalhes</Text>
                <View style={styles.side} />
            </View>
        </View>
    );
};
