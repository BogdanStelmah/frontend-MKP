import { Stack } from 'expo-router';
import React from 'react';

const MainRoutesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal-info" />
    </Stack>
  );
};

export default MainRoutesLayout;
