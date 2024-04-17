import { getLocales } from 'expo-localization';

import { LangEnum } from '@/common/enums';

export const getDeviceLanguage = (): LangEnum => {
  const deviceLanguage = getLocales()[0]?.languageCode as LangEnum;

  return Object.values(LangEnum).includes(deviceLanguage) ? deviceLanguage : LangEnum.UK;
};
