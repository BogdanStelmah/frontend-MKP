import { IPreviewRecipe } from '@/common/entities/recipe.entity';
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
  mealPlanToRecipes?: IMealPlanToRecipe[];
}

export interface ICategoryToPlan {
  id: number;
  planId: number;
  categoryId: number;
}

export interface IMealPlanToRecipe {
  id: number;
  servingRatio: number;
  recipe: IPreviewRecipe;
}
