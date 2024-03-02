import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { retrieveToken } from '@/service/helper';
import { useUserStore } from '@/store';

const Index = () => {
  const login = useUserStore.use.login();
  const isUserHasPersonalInfo = useUserStore.use.isUserHasPersonalInfo();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await retrieveToken();

      if (!token) {
        router.navigate('/introduction');
        return await SplashScreen.hideAsync();
      }

      login();

      const hasPersonalInfo = await isUserHasPersonalInfo();

      if (!hasPersonalInfo) {
        router.navigate('/personal-info');
      } else {
        router.navigate('/recipe-search');
      }

      await SplashScreen.hideAsync();
    };

    fetchToken();
  }, []);

  return null;
};

export default Index;
