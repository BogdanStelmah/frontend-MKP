import { Stack } from 'expo-router';
import React from 'react';

const GuestRoutesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="introduction" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
};

export default GuestRoutesLayout;
