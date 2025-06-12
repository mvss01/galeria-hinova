import { PermissionRequest } from '@/src/components/PermissionRequest';
import { CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { CameraPreview } from '../../components/CameraPreview';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';
const PHOTOS_JSON = PHOTOS_DIR + 'photos.json';

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);

  const getLastPhoto = async () => {
  try {
    const jsonInfo = await FileSystem.getInfoAsync(PHOTOS_JSON);
    if (!jsonInfo.exists) {
      return null;
    }
    const json = await FileSystem.readAsStringAsync(PHOTOS_JSON);
    const photoObjects = json ? JSON.parse(json) : [];
    if (photoObjects.length === 0) {
      return null;
    }
    return photoObjects[0].uri;
  } catch (error) {
    console.error('Erro ao buscar última foto do file system:', error);
    return null;
  }
};

  useEffect(() => {
    const fetchLastPhoto = async () => {
      const uri = await getLastPhoto();
      setLastPhotoUri(uri);
    };
    fetchLastPhoto();
  }, []);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    const handleRequestPermission = async () => {
      await requestPermission();
    };
    return (
      <PermissionRequest requestPermission={handleRequestPermission} message="Precisamos da sua permissão para acessar sua câmera."/>
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      <CameraPreview facing={facing} flash={flash} onToggleFacing={() => setFacing(f => (f === 'back' ? 'front' : 'back'))} onToggleFlash={() => setFlash(f => (f === 'on' ? 'off' : 'on'))} lastPhoto={lastPhotoUri}/>
    </>
  );
}
