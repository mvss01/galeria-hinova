import * as Location from 'expo-location';
import React, { createContext, useContext, useEffect, useState } from 'react';

type LocationType = {
  latitude: number | null;
  longitude: number | null;
};

type LocationContextType = {
  location: LocationType;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationType>({ latitude: null, longitude: null });

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permissão de localização negada');
          return;
        }
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 0,
          },
          (loc) => {
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          }
        );

      } catch (err) {
        console.warn('Erro ao obter localização:', err);
      }
    };

    startWatching();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation deve ser usado dentro de LocationProvider');
  }
  return context.location;
}
