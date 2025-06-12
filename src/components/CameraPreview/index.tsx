import { Photo } from "@/src/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraType, CameraView, FlashMode } from 'expo-camera';
import { Image } from "expo-image";
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
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
  const cameraRef = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);

  const takePicture = async () => {
  try {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      const date = new Date().toLocaleString();
      let latitude = null;
      let longitude = null;
      const location = await Location.getCurrentPositionAsync({});
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;


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

      <View style={styles.header}>
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

      <View style={styles.controlsContainer}>
        <Image
          source={
            uri
              ? { uri }
              : lastPhoto
                ? { uri: lastPhoto }
                : require('@/assets/empty.jpeg')
          }
          contentFit="cover"
          style={styles.lastPhotoSquare}
        />

        <Pressable
          style={({ pressed }) => [
            styles.captureCircle,
            { opacity: pressed ? 0.5 : 1 },
            styles.captureCircle
         ]}
          onPress={takePicture}
        />
        <Pressable
          style={({ pressed }) => [
            styles.switchButton,
            { opacity: pressed ? 0.5 : 1 },
            styles.switchButton
          ]}
          onPress={onToggleFacing}
        >
          <MaterialCommunityIcons name="camera-flip-outline" size={24} color="#fff" />
        </Pressable>
      </View>

    </View>
  );
}
