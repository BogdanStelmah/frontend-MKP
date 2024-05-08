import { GenderEnum } from '@/common/enums/gender.enum';
import { GenderOption } from '@/common/types';
import i18n from '@/i18n';

export const getGenderDictionary = (): GenderOption[] => [
  { label: i18n.t('gender.female'), value: GenderEnum.FEMALE },
  { label: i18n.t('gender.male'), value: GenderEnum.MALE },
  { label: i18n.t('gender.unspecified'), value: GenderEnum.UNSPECIFIED }
];
