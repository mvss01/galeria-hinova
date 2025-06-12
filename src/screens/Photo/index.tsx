import { PhotoComponent } from '@/src/components/Photo';
import { PhotoDetail } from '@/src/components/PhotoDetails';
import { PhotoHeader } from '@/src/components/PhotoHeader';
import { Photo, RootStackParams } from '@/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { styles } from './styles';

const PHOTOS_KEY = 'photos_uris';

export const PhotoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();
  const { uri, returnScreen } = (route as any).params;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const json = await AsyncStorage.getItem(PHOTOS_KEY);
        const photoObjects = json ? JSON.parse(json) : [];
        setPhotos(photoObjects);
        const index = photoObjects.findIndex((item: Photo) => item.uri === uri);
        setCurrentIndex(index >= 0 ? index : 0);
      } catch (error) {
        console.error('Erro ao buscar informações das fotos:', error);
      }
    };
    getPhotos();
  }, [uri]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  });

  return (
    <View style={styles.container}>
      <PhotoHeader onClick={() => navigation.replace(returnScreen)} />
      {photos.length > 0 ? (
        <View>
          <FlatList
            data={photos}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <View style={{ width: Dimensions.get('window').width, height: '100%' }}>
                <PhotoComponent uri={item.uri} />
              </View>
            )}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            initialScrollIndex={currentIndex}
            getItemLayout={(_, index) => ({
              length: Dimensions.get('window').width,
              offset: Dimensions.get('window').width * index,
              index,
            })}
            showsHorizontalScrollIndicator={false}
          />
    </View>

      ) : null}
      {photos.length > 0 && (
        <PhotoDetail
          data={photos[currentIndex]?.date ?? ''}
          longitude={photos[currentIndex]?.longitude ?? 0}
          latitude={photos[currentIndex]?.latitude ?? 0}
        />
      )}
    </View>
  );
};
