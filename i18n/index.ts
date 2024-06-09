import { I18n } from 'i18n-js';

import { LangEnum } from '@/common/enums';
import { getDeviceLanguage } from '@/common/utils';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: require('./locales/en.json'),
  uk: require('./locales/uk.json')
});

// Set the locale once at the beginning of your app.
getDeviceLanguage().then((lang) => {
  i18n.locale = lang;
});

i18n.enableFallback = true;

export function changeLanguage(lang: LangEnum) {
  i18n.locale = lang;
}

export default i18n;
