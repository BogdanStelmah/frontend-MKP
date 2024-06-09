import { LangEnum } from '@/common/enums';
import i18n from '@/i18n';

export const formatDayName = (date: Date): string => {
  if (i18n.locale === LangEnum.EN) {
    return date.toLocaleString('en-us', { weekday: 'short' });
  }

  const shortDayName = date.toLocaleString('uk-UA', { weekday: 'long' });
  return shortDayName.charAt(0).toUpperCase() + shortDayName.slice(1);
};
