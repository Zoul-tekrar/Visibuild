import "../global.css";

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PrototypeProvider } from '@/state/prototype-store';

export default function RootLayout() {
  return (
    <PrototypeProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      <StatusBar style="dark" />
    </PrototypeProvider>
  );
}
