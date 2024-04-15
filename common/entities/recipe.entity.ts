import { IRecipeAuthor } from '@/common/entities/user.entity';

export interface IRecipe extends IPreviewRecipe {
  description?: string;
  cookingInstructions: string;
  calorieContent: string;
  weight: number;
  numberOfServings: number;
  user?: IRecipeAuthor;
  ingredientToRecipes?: IIngredientToRecipe[];
}

export interface IPreviewRecipe {
  id: number;
  imageUrl?: string;
  title: string;
}

export interface IIngredientToRecipe {
  id: number;
  unitOfMeasure: string;
  quantity?: number;
  comment?: string;
  recipeId: number;
  ingredientId: number;
  ingredient: IIngredient;
}

export interface IIngredient {
  id: number;
  name: string;
  description?: string;
}
