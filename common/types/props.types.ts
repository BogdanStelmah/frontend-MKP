import { Control } from 'react-hook-form';

import { GenderEnum } from '@/common/enums/gender.enum';

export type TypeOption = {
  label: string;
  value: string;
};

export interface FormProps {
  name: string;
  control: Control<any, any> | undefined;
}

export interface GenderOption {
  label: string;
  value: GenderEnum;
}
