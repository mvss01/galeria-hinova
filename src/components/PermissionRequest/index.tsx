import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type PermissionRequestProps = {
  requestPermission: () => Promise<void>;
  message: string;
};

export const PermissionRequest: React.FC<PermissionRequestProps> = ({ requestPermission, message }) => (
  <View style={styles.container} accessible accessibilityRole="alert">
    <Text style={styles.title} accessibilityRole="header" accessibilityLabel="Permissão necessária">
      {message}
    </Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => requestPermission()}
      accessibilityRole="button"
      accessibilityLabel="Permitir acesso"
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Permitir</Text>
    </TouchableOpacity>
  </View>
);
