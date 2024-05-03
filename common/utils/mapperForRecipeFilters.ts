import { FilterRecipeParams, SearchParam } from '@/common/interfaces';
import { RecipeFiltersType } from '@/common/types';

export const mapperForRecipeFilters = (
  recipeFilters: RecipeFiltersType & SearchParam
): Partial<SearchParam & FilterRecipeParams> => {
  const { general, cookingTime, calories, tags, recipeAuthors, searchQuery } = recipeFilters;

  const recipeFrom =
    Array.isArray(recipeAuthors) && recipeAuthors.length === 2 ? undefined : recipeAuthors[0];

  return {
    searchQuery,
    categoryIds: general?.value ? [Number(general.value)] : [],
    tagIds: tags?.value ? [Number(tags.value)] : [],
    calorieRange: Array.isArray(calories?.value) ? calories.value : [],
    cookingTime: Array.isArray(cookingTime?.value) ? cookingTime.value : [],
    recipeFrom,
    ingredientIds: []
  };
};
