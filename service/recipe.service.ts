import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { FilterRecipeParams, PaginationParams, SearchParam } from '@/common/interfaces';
import { requestApi } from '@/service/apiAxios';

const FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API = '/recipe/getPreviewRecipesByCategoryId';
const FETCH_RECIPE_BY_ID_API = '/recipe/getRecipeById';
const FETCH_CALCULATED_RECIPE_FOR_MEAL_PLAN_BY_ID_API =
  '/mealPlan/getCalculatedRecipeForMealPlanById';
const FETCH_PREVIEW_RECIPES = '/recipe/getPreviewRecipes';

const fetchPreviewRecipesByCategoryId = async (
  categoryId: number | string,
  paginationParams?: PaginationParams
) => {
  return (
    await requestApi<IPreviewRecipe[]>(
      'GET',
      `${FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API}/${categoryId}`,
      {
        params: paginationParams
      }
    )
  ).data;
};

const fetchRecipeById = async (recipeId: number | string) => {
  return (await requestApi<IRecipe>('GET', `${FETCH_RECIPE_BY_ID_API}/${recipeId}`)).data;
};

const fetchPreviewRecipes = async (
  queryParams: Partial<PaginationParams & SearchParam & FilterRecipeParams>
) => {
  return (
    await requestApi<IPreviewRecipe[]>('GET', FETCH_PREVIEW_RECIPES, {
      params: { ...queryParams }
    })
  ).data;
};

const fetchCalculatedRecipeForMealPlanById = async (params: {
  mealPlanToRecipeId: number;
  recipeId: number;
}) => {
  return (
    await requestApi<IRecipe>('GET', `${FETCH_CALCULATED_RECIPE_FOR_MEAL_PLAN_BY_ID_API}`, {
      params
    })
  ).data;
};

export const recipeApi = {
  fetchPreviewRecipesByCategoryId,
  fetchRecipeById,
  fetchPreviewRecipes,
  fetchCalculatedRecipeForMealPlanById
};
