import { IUser } from '@/common/types';

export interface IPlan {
  id: number;
  date: string;
  user?: IUser;
  mealPlan?: IMealPlan[];
}

export interface IMealPlan {
  id: number;
  name: string;
  preparationStartTime?: string;
  preparationEndTime?: string;
  mealStartTime?: string;
  mealEndTime?: string;
  totalNumberOfServings: number;
}
