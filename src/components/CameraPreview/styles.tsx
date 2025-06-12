import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    position: 'absolute',
    paddingHorizontal: '8%',
    top: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  flashButton: {

  },
  camera: {
    flex: 1
  },
  controlsContainer: {
    position: 'absolute',
    paddingHorizontal: '8%',
    bottom: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lastPhotoSquare: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: 'gray'
  },
  captureCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.5)'
  },
  switchButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 32,
    padding: 16
  }
});
