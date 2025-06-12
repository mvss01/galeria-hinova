import { RootStackParams } from '@/src/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const PhotoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();
  const { uri } = (route as any).params;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: 'black' }}>{uri}</Text>
    </View>
  );
}
