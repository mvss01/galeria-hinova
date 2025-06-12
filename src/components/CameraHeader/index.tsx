import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FlashMode } from "expo-camera";
import { Pressable, View } from "react-native";
import { styles } from "./styles";

interface CameraHeaderProps {
    onNavigate: () => void;
    onToggleFlash: () => void
    flash: FlashMode
}

export const CameraHeader = ({onNavigate, onToggleFlash, flash}: CameraHeaderProps) => {
    return (
        <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.5 : 1 },
            styles.backButton
          ]}
          onPress={() => onNavigate()}
        >
          <AntDesign name="left" size={32} color="#fff" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.flashButton,
            { opacity: pressed ? 0.5 : 1 },
            styles.flashButton
          ]}
          onPress={onToggleFlash}
        >
          <Ionicons name={flash === "on" ? "flash-off-outline" : "flash-outline"} size={32} color="#fff" />
        </Pressable>
      </View>
    )
}
