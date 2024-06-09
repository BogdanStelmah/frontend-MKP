import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';

import 'react-native-reanimated';
// import 'react-native-gesture-handler';

import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'lato-black': require('../assets/fonts/latoblack.ttf'),
    'lato-medium': require('../assets/fonts/latomedium.ttf'),
    'lato-bold': require('../assets/fonts/latobold.ttf'),
    'lato-regular': require('../assets/fonts/latoregular.ttf'),
    'lato-semibold': require('../assets/fonts/latosemibold.ttf'),
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(guest-routes)" />
      <Stack.Screen name="(main-routes)" />
    </Stack>
  );
}
