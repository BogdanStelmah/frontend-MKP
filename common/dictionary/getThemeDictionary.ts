import { ThemeEnum } from '@/common/enums';
import { ThemeOption } from '@/common/types';
import i18n from '@/i18n';

export const getThemeDictionary = (): ThemeOption[] => [
  { label: i18n.t('general.theme.dark'), value: ThemeEnum.DARK },
  { label: i18n.t('general.theme.light'), value: ThemeEnum.LIGHT }
];
