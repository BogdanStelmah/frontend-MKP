import { router, SplashScreen } from 'expo-router';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { DevSettings } from 'react-native';

import i18n, { changeLanguage } from '@/i18n';
import { retrieveToken, writeLanguage } from '@/service/helper';
import { useUserStore } from '@/store';

export const reloadAsync = __DEV__ ? DevSettings.reload : Updates.reloadAsync;

const Index = () => {
  const login = useUserStore.use.login();
  const isUserHasPersonalInfo = useUserStore.use.isUserHasPersonalInfo();
  const fetchMe = useUserStore.use.fetchMe();
  const me = useUserStore.use.me();

  useEffect(() => {
    if (me?.setting.language && me.setting.language !== i18n.locale) {
      writeLanguage(me.setting.language).then(() => {
        changeLanguage(me.setting.language);
        reloadAsync();
      });
    }
  }, [me]);

  useEffect(() => {
    const initFetch = async () => {
      const token = await retrieveToken();

      if (!token) {
        router.navigate('/introduction');
        return await SplashScreen.hideAsync();
      }

      login();

      const hasPersonalInfo = await isUserHasPersonalInfo();
      await fetchMe();

      if (!hasPersonalInfo) {
        router.navigate('/personal-info');
      } else {
        router.navigate('/recipe-search');
      }

      await SplashScreen.hideAsync();
    };

    initFetch();
  }, []);

  return null;
};

export default Index;
