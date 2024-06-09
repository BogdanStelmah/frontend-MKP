import { IIngredientToRecipe } from '@/common/entities';

export const generateIngredientText = (ingredientToRecipeData: IIngredientToRecipe): string => {
  const { quantity, unitOfMeasure, name, comment, description } = ingredientToRecipeData;

  const textDescription = description ? ` (${description})` : '';
  const textComment = comment ? `, ${comment}` : '';

  return `${name}${textDescription} - ${quantity || ''} ${unitOfMeasure}${textComment}`;
};
