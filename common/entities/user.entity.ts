import { GenderEnum } from '@/common/enums/gender.enum';

export interface IRecipeAuthor {
  id: number;
  firstName: string;
  lastName?: string;
  gender?: GenderEnum;
}
