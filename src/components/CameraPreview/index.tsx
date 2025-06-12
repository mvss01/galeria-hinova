import { useLocationWatcher } from "@/src/Hooks/useLocationWatcher";
import { Photo, RootStackParams } from "@/src/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraType, CameraView, FlashMode } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { CameraControls } from "../CameraControls";
import { CameraHeader } from "../CameraHeader";
import { styles } from './styles';

interface CameraPreviewProps {
  lastPhoto: string | null;
  facing: CameraType;
  onToggleFacing: () => void;
  flash: FlashMode;
  onToggleFlash: () => void;
}

const PHOTOS_KEY = 'photos_uris';

export const CameraPreview = ({ facing, onToggleFacing, flash, onToggleFlash, lastPhoto }: CameraPreviewProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
 const { latitude, longitude } = useLocationWatcher(10000);
  const cameraRef = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(lastPhoto || require('@/assets/empty.jpeg'));

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        const date = new Date().toLocaleString();

        const json = await AsyncStorage.getItem(PHOTOS_KEY);
        const photos = json ? JSON.parse(json) : [];

        const updatedPhotos: Photo[] = [
          { uri: photo.uri, date, latitude, longitude},
          ...photos,
        ];

        await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));

        setUri(photo.uri);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  return (
    <View style={styles.container}>

      <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flash}/>

      <CameraHeader flash={flash} onNavigate={() =>  navigation.replace("gallery")} onToggleFlash={() => onToggleFlash()}/>

      <CameraControls
        uri={uri}
        onTakePicture={() => takePicture()}
        onToggleFacing={() => onToggleFacing()}
        onNavigate={() => navigation.replace("photo", { uri: uri ?? '', returnScreen: 'camera' })}
      />

    </View>
  );
}
