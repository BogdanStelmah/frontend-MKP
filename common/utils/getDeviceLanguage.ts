import { getLocales } from 'expo-localization';

import { LangEnum } from '@/common/enums';
import { retrieveLanguage } from '@/service/helper';

export const getDeviceLanguage = async (): Promise<LangEnum> => {
  const storedLanguage = await retrieveLanguage();

  if (storedLanguage) return storedLanguage;

  const deviceLanguage = getLocales()[0]?.languageCode as LangEnum;

  return Object.values(LangEnum).includes(deviceLanguage) ? deviceLanguage : LangEnum.UK;
};
