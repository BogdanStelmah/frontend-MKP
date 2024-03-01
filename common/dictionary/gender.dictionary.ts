import { GenderEnum } from '@/common/enums/gender.enum';
import { TypeOption } from '@/common/types';

export const genderDictionary: TypeOption[] = [
  { label: 'Жінка', value: GenderEnum.FEMALE },
  { label: 'Чоловік', value: GenderEnum.MALE },
  { label: 'Інше', value: GenderEnum.UNSPECIFIED }
];
