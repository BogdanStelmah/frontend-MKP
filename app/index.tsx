import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { retrieveToken } from '@/service/helper';
import { useUserStore } from '@/store';

const Index = () => {
  const login = useUserStore.use.login();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await retrieveToken();

      if (token) {
        login();
        router.navigate('/personal-info');
      } else {
        router.navigate('/introduction');
      }

      await SplashScreen.hideAsync();
    };

    fetchToken();
  }, []);

  return null;
};

export default Index;
