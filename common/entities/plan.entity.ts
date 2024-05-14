import { IUser } from '@/common/types';

export interface IPlan {
  id: number;
  date: string;
  user?: IUser;
  mealPlan?: IMealPlan[];
  categoryToPlans?: ICategoryToPlan[];
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

export interface ICategoryToPlan {
  id: number;
  planId: number;
  categoryId: number;
}
