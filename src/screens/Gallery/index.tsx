import { CameraButton } from '@/src/components/CameraButton';
import { GalleryHeader } from '@/src/components/GalleryHeader';
import { Photos } from '@/src/components/Photos';
import { PhotosEmpty } from '@/src/components/PhotosEmpty';
import { Photo, RootStackParams } from '@/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { styles } from './styles';

const PHOTOS_KEY = 'photos_uris';

export const GalleryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [photos, setPhotos] = useState<string[]>([]);

  const loadPhotos = useCallback(async () => {
  try {
    const json = await AsyncStorage.getItem(PHOTOS_KEY);
    const photoObjects = json ? JSON.parse(json) : [];
    const uris = photoObjects.map((photo: Photo) => photo.uri).filter(Boolean);
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
