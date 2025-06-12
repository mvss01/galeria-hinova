import { PermissionRequest } from '@/src/components/PermissionRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { CameraPreview } from '../../components/CameraPreview';

const PHOTOS_KEY = 'photos_uris';

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);

  const getLastPhoto = async () => {
    try {
      const json = await AsyncStorage.getItem(PHOTOS_KEY);
      const photoObjects = json ? JSON.parse(json) : [];
      if (photoObjects.length === 0) {
        return null;
      }
      return photoObjects[0].uri;
    } catch (error) {
      console.error('Erro ao buscar última foto do AsyncStorage:', error);
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
