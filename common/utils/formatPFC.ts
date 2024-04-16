import { IRecipe } from '@/common/entities';

export const formatPFC = ({
  protein,
  fat,
  carbohydrates
}: Pick<IRecipe, 'protein' | 'fat' | 'carbohydrates'>) => {
  if (!protein || !fat || !carbohydrates) return '';

  return `${protein.toFixed(1)}г / ${fat.toFixed(1)}г / ${carbohydrates.toFixed(1)}г`;
};
