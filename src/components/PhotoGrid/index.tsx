import { RootStackParams } from '@/src/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface PhotoGridProps {
  photos: string[];
  loading: boolean;
  loadMore: () => void;
  numColumns: number
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, loading, loadMore, numColumns = 3 }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const imageSize = Dimensions.get('window').width / numColumns;

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => navigation.navigate("photo", { uri: item, returnScreen: "gallery" })}>
      <Image
        source={{ uri: item }}
        style={{ width: imageSize, height: imageSize, margin: 1, backgroundColor: '#eee' }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        numColumns={numColumns}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};
