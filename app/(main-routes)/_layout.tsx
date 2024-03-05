import { Stack } from 'expo-router';
import React from 'react';

const MainRoutesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default MainRoutesLayout;
