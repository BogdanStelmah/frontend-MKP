import { router, SplashScreen } from 'expo-router';
import * as Updates from 'expo-updates';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { DevSettings, Appearance } from 'react-native';

import i18n, { changeLanguage } from '@/i18n';
import { retrieveToken, writeLanguage, writeTheme } from '@/service/helper';
import { useUserStore } from '@/store';

export const reloadAsync = __DEV__ ? DevSettings.reload : Updates.reloadAsync;

const Index = () => {
  const { setColorScheme } = useColorScheme();

  const login = useUserStore.use.login();
  const isUserHasPersonalInfo = useUserStore.use.isUserHasPersonalInfo();
  const fetchMe = useUserStore.use.fetchMe();
  const me = useUserStore.use.me();

  useEffect(() => {
    const theme = me?.setting.theme;
    const language = me?.setting.language;

    if (language && language !== i18n.locale) {
      writeLanguage(language).then(() => {
        changeLanguage(language);
        reloadAsync();
      });
    }

    if (theme) {
      writeTheme(theme).then(() => {
        if (theme === 'light') {
          setColorScheme(theme);
          Appearance.setColorScheme(theme);
        }

        if (theme === 'dark') {
          setColorScheme(theme);
          Appearance.setColorScheme(theme);
        }
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
