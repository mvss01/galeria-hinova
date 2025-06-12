import { useLocationWatcher } from "@/src/Hooks/useLocationWatcher";
import { RootStackParams } from "@/src/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraType, CameraView, FlashMode } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
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

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';
const PHOTOS_JSON = PHOTOS_DIR + 'photos.json';

export const CameraPreview = ({ facing, onToggleFacing, flash, onToggleFlash, lastPhoto }: CameraPreviewProps) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { latitude, longitude } = useLocationWatcher(10000);
  const cameraRef = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(lastPhoto);

  React.useEffect(() => {
    setUri(lastPhoto);
  }, [lastPhoto]);

  const [showFrontFlash, setShowFrontFlash] = useState(false);
  const takePicture = async () => {
    try {
      if (facing === "front" && flash === "on") {
        setShowFrontFlash(true);
        await new Promise(resolve => setTimeout(resolve, 180));
      }

      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        const dirInfo = await FileSystem.getInfoAsync(PHOTOS_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(PHOTOS_DIR, { intermediates: true });
        }
        const fileName = `photo_${Date.now()}.jpg`;
        const destUri = PHOTOS_DIR + fileName;
        await FileSystem.copyAsync({ from: photo.uri, to: destUri });

        const date = new Date().toLocaleString();

        let photos = [];

        const jsonInfo = await FileSystem.getInfoAsync(PHOTOS_JSON);
        if (jsonInfo.exists) {
          const json = await FileSystem.readAsStringAsync(PHOTOS_JSON);
          photos = json ? JSON.parse(json) : [];
        }

        const updatedPhotos = [
          { uri: destUri, date, latitude, longitude },
          ...photos,
        ];

        await FileSystem.writeAsStringAsync(PHOTOS_JSON, JSON.stringify(updatedPhotos));

        setUri(destUri);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    } finally {
      setShowFrontFlash(false);
    }
  };


  return (
    <View style={styles.container}>

      <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flash}/>

      {showFrontFlash && (
        <View style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#fff',
          opacity: 0.85,
          zIndex: 999,
        }}/>
      )}
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
