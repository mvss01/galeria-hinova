export interface Photo {
  uri: string;
  date: string;
  latitude: number;
  longitude: number;
}

export type RootStackParams = {
  camera: undefined;
  photo: { uri: string };
  gallery: undefined;
};
