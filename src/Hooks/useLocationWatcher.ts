import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

export function useLocationWatcher(interval = 10000) {
  const [coords, setCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const intervalRef = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        const location = await Location.getLastKnownPositionAsync();
        if (location && isMounted) {
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          const current = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          if (isMounted) {
            setCoords({
              latitude: current.coords.latitude,
              longitude: current.coords.longitude,
            });
          }
        }
      } catch (err) {
        console.warn('Erro ao obter localização:', err);
      }
    };

    // Solicita permissão e inicia o intervalo
    (async () => {
        await getLocation();
        intervalRef.current = setInterval(getLocation, interval);
    })();

    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval]);

  return coords;
}
