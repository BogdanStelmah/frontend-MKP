import { ThemeEnum } from '@/common/enums';
import { ThemeOption } from '@/common/types';

export const getThemeDictionary = (): ThemeOption[] => [
  { label: 'Звичайна', value: ThemeEnum.DEFAULT },
  { label: 'Темна', value: ThemeEnum.DARK },
  { label: 'Світла', value: ThemeEnum.LIGHT }
];
