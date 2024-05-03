import { LangEnum } from '@/common/enums';
import i18n from '@/i18n';

export const formatShortMonthName = (date: Date): string => {
  if (i18n.locale === LangEnum.EN) {
    return date.toLocaleString('en-us', { month: 'short' });
  }

  const shortMonthName = date.toLocaleString('uk-UA', { month: 'short' });
  return shortMonthName.charAt(0).toUpperCase() + shortMonthName.slice(1);
};
