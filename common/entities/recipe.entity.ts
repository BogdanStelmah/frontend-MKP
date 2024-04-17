import { IRecipeAuthor } from '@/common/entities/user.entity';

export interface IRecipe extends IPreviewRecipe {
  description?: string;
  cookingInstructions: string;
  calorieContent: string;
  weight: number;
  numberOfServings: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  user?: IRecipeAuthor;
  ingredientToRecipes?: IIngredientToRecipe[];
  rating: IRecipeRating;
}

export interface IPreviewRecipe {
  id: number;
  imageUrl?: string;
  title: string;
}

export interface IIngredientToRecipe {
  id: number;
  quantity?: number;
  name: string;
  description?: string;
  unitOfMeasure: string;
  comment?: string;
}

export interface IRecipeRating {
  id: number;
  totalRating: number;
  totalUsersRated: number;
  calculatedRating: number;
}
