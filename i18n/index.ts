import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import { LangEnum } from '@/common/enums/language.enum';

const deviceLanguage = getLocales()[0]?.languageCode;

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: require('./locales/en.json'),
  uk: require('./locales/uk.json')
});

// Set the locale once at the beginning of your app.
i18n.locale = deviceLanguage || LangEnum.UK;
i18n.enableFallback = true;
i18n.defaultLocale = LangEnum.UK;

export function changeLanguage(lang: LangEnum) {
  i18n.locale = lang;
}

export default i18n;
