import { Control } from 'react-hook-form';

import { LangEnum, ThemeEnum, UsersTypeEnum } from '@/common/enums';
import { GenderEnum } from '@/common/enums/gender.enum';

export type TypeOption = {
  label: string;
  value: string | number | number[] | undefined;
};

export interface FormProps {
  name: string;
  control: Control<any, any> | undefined;
}

export interface GenderOption {
  label: string;
  value: GenderEnum;
}

export interface LangOption {
  label: string;
  value: LangEnum;
}

export interface ThemeOption {
  label: string;
  value: ThemeEnum;
}

export interface RecipeFiltersType {
  general: TypeOption | undefined;
  cookingTime: TypeOption | undefined;
  calories: TypeOption | undefined;
  tags: TypeOption | undefined;
  recipeAuthors: UsersTypeEnum[];
}

export interface MealCardSetting {
  id: number;
  name: string;
  preparationStartTime: Date | null;
  preparationEndTime: Date | null;
  mealStartTime: Date | null;
  mealEndTime: Date | null;
  totalNumberOfServings: number;
}
