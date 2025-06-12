import { CameraButton } from '@/src/components/CameraButton';
import { GalleryHeader } from '@/src/components/GalleryHeader';
import { Photos } from '@/src/components/Photos';
import { PhotosEmpty } from '@/src/components/PhotosEmpty';
import { RootStackParams } from '@/src/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import React, { useCallback, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { styles } from './styles';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';
const PHOTOS_JSON = PHOTOS_DIR + 'photos.json';

export const GalleryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [photos, setPhotos] = useState<string[]>([]);

  const loadPhotos = useCallback(async () => {
    try {
      const jsonInfo = await FileSystem.getInfoAsync(PHOTOS_JSON);
      if (!jsonInfo.exists) {
        setPhotos([]);
        return;
      }
      const json = await FileSystem.readAsStringAsync(PHOTOS_JSON);
      const photoObjects = json ? JSON.parse(json) : [];
      const uris = photoObjects.map((photo: { uri: string }) => photo.uri).filter(Boolean);
      setPhotos(uris);
    } catch (error) {
      setPhotos([]);
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [loadPhotos])
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        <GalleryHeader />
        {!photos.length ? <PhotosEmpty /> : <Photos photos={photos} />}
        <CameraButton onPress={() => navigation.navigate('camera')} />
      </View>
    </>
  );
};
