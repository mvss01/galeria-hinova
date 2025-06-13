import { Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { ShantellSans_700Bold } from '@expo-google-fonts/shantell-sans';
import { useForegroundPermissions } from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { Platform } from 'react-native';
import { LocationProvider } from './src/context/LocationContext';
import { Routes } from "./src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    Inter_600SemiBold,
    ShantellSans_700Bold
  });
  const [locationPermission, requestLocationPermission] = useForegroundPermissions();

  useEffect(() => {
    async function verifyAndGetPermissions() {
      if (!locationPermission || locationPermission.status !== 'granted') {
        await requestLocationPermission();
      }
    }

    async function setup() {
      if (Platform.OS === 'android') {
        NavigationBar.setPositionAsync('absolute');
        NavigationBar.setBackgroundColorAsync('#ffffff00');
        await verifyAndGetPermissions();
      }
    }

    setup();
  }, [locationPermission, requestLocationPermission]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LocationProvider>
      <Routes />
    </LocationProvider>
  );
}
