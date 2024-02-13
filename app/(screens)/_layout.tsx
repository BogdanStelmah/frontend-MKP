import { Stack, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { retrieveToken } from '@/service/helper';

const ScreensLayout = () => {
  const router = useRouter();
  const { isAuthenticated, signIn } = useContext(AuthContext);

  const redirectToIntroduction = () => {
    router.navigate('/introduction');
  };

  const redirectToPersonalInfo = () => {
    router.navigate('/personalInfo');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await retrieveToken();
      console.log(token);
      if (token) {
        signIn();
        redirectToPersonalInfo();
      } else {
        redirectToIntroduction();
      }
    };

    fetchData();
  }, []);

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
