import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import '../global.css';

import { retrieveToken } from '@/service/helper';
import { useUserStore } from '@/store/userStore';

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const login = useUserStore.use.login();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await retrieveToken();

      if (token) {
        login();
        router.navigate('/personalInfo');
      } else {
        router.navigate('/introduction');
      }
    };

    fetchToken();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(guest-routes)" />
      <Stack.Screen name="(main-routes)" />
    </Stack>
  );
}
