import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { styles } from "./styles";

interface CameraControlsProps {
    uri: string | null;
    onToggleFacing: () => void;
    onTakePicture: () => void;
    onNavigate: () => void;
}

export const CameraControls = ({uri, onToggleFacing, onTakePicture, onNavigate}: CameraControlsProps) => {
    return (
        <View style={styles.container}>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={() => { onNavigate() }}
          >
            <Image
              key={uri || "empty"}
              source={
                uri
                  ? { uri }
                  : require('@/assets/empty.jpeg')
              }
              style={styles.lastPhotoSquare}
            />
          </Pressable>

            <Pressable
            style={({ pressed }) => [
                styles.captureCircle,
                { opacity: pressed ? 0.5 : 1 },
                styles.captureCircle
            ]}
            onPress={() => onTakePicture()}
            />
            <Pressable
            style={({ pressed }) => [
                styles.switchCameraButton,
                { opacity: pressed ? 0.5 : 1 },
                styles.switchCameraButton
            ]}
            onPress={() => onToggleFacing()}
            >
            <MaterialCommunityIcons name="camera-flip-outline" size={24} color="#fff" />
            </Pressable>
      </View>
    )
}
