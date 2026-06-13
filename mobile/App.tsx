import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LandingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
