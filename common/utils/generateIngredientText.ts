import { IIngredientToRecipe } from '@/common/entities';

export const generateIngredientText = (ingredientToRecipeData: IIngredientToRecipe): string => {
  const { name } = ingredientToRecipeData.ingredient;
  const { quantity, unitOfMeasure } = ingredientToRecipeData;

  return `${name} - ${quantity || ''} ${unitOfMeasure}`;
};
