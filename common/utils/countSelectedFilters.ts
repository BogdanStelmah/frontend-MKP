import { RecipeFiltersType } from '@/common/types';

export const countSelectedFilters = (selectedFilters: RecipeFiltersType) => {
  const { general, cookingTime, calories, tags, recipeAuthors } = selectedFilters;

  return [general, cookingTime, calories, tags, recipeAuthors[0]].filter(
    (filter) => filter !== undefined
  ).length;
};
