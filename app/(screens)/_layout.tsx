import { Stack } from 'expo-router';
import React from 'react';

const ScreensLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="introduction" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="personalInfo" />
    </Stack>
  );
};

export default ScreensLayout;
