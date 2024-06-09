import { IAddIngredientFormInput } from '@/components/business/MyRecipes/AddIngredientModal';

export const formatIngredient = ({
  quantity,
  nameIngredient,
  comment,
  unitOfMeasure
}: IAddIngredientFormInput) => {
  const quantityString = quantity ? ` - ${quantity} ${unitOfMeasure}` : '';
  const commentString = comment ? ` (${comment})` : '';

  return `${nameIngredient}${quantityString}${commentString}`;
};
