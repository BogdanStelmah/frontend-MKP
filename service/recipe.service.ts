import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { PaginationParams } from '@/common/interfaces';
import { requestApi } from '@/service/apiAxios';

const FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API = '/recipe/getPreviewRecipesByCategoryId';
const FETCH_RECIPE_BY_ID_API = '/recipe/getRecipeById';

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

export const recipeApi = {
  fetchPreviewRecipesByCategoryId,
  fetchRecipeById
};
