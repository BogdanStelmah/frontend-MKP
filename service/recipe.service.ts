import { IPreviewRecipe } from '@/common/entities';
import { requestApi } from '@/service/apiAxios';

const FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API = '/recipe/getPreviewRecipesByCategoryId';

const fetchPreviewRecipesByCategoryId = async (categoryId: number | string) => {
  return (
    await requestApi<IPreviewRecipe[]>(
      'GET',
      `${FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API}/${categoryId}`
    )
  ).data;
};

export const recipeApi = {
  fetchPreviewRecipesByCategoryId
};
