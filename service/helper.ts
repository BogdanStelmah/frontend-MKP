import AsyncStorage from '@react-native-async-storage/async-storage';

import { LangEnum, ThemeEnum } from '@/common/enums';

export const retrieveToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error(error);
  }
};

export const writeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error(error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};

export const retrieveLanguage = async (): Promise<LangEnum | undefined> => {
  try {
    return (await AsyncStorage.getItem('language')) as LangEnum;
  } catch (error) {
    console.error(error);
  }
};

export const writeLanguage = async (language: LangEnum) => {
  try {
    await AsyncStorage.setItem('language', language);
  } catch (error) {
    console.error(error);
  }
};

export const retrieveTheme = async (): Promise<ThemeEnum | undefined> => {
  try {
    return (await AsyncStorage.getItem('theme')) as ThemeEnum;
  } catch (error) {
    console.error(error);
  }
};

export const writeTheme = async (theme: ThemeEnum) => {
  try {
    await AsyncStorage.setItem('theme', theme);
  } catch (error) {
    console.error(error);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};
