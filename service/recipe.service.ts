import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { FilterRecipeParams, PaginationParams, SearchParam } from '@/common/interfaces';
import config from '@/config';
import i18n from '@/i18n';
import { requestApi } from '@/service/apiAxios';
import { retrieveToken } from '@/service/helper';

const FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API = '/recipe/getPreviewRecipesByCategoryId';
const FETCH_RECIPE_BY_ID_API = '/recipe/getRecipeById';
const FETCH_FAVORITE_RECIPES_API = '/recipe/getFavorites';
const FETCH_CALCULATED_RECIPE_FOR_MEAL_PLAN_BY_ID_API =
  '/mealPlan/getCalculatedRecipeForMealPlanById';
const FETCH_IS_FAVORITE_RECIPE_API = '/recipe/isFavorite';
const FETCH_PREVIEW_RECIPES = '/recipe/getPreviewRecipes';
const FETCH_MY_RECIPES_API = '/recipe/getMyRecipes';

const CREATE_RECIPE_API = '/recipe';
const ADD_RECIPE_TO_FAVORITES_API = '/recipe/addFavorite';
const REMOVE_RECIPE_FROM_FAVORITES_API = '/recipe/removeFavorite';
const PUBLISH_RECIPE_API = '/recipe/publish';

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

const fetchFavoriteRecipes = async (paginationParams?: PaginationParams) => {
  return (
    await requestApi<IRecipe[]>('GET', FETCH_FAVORITE_RECIPES_API, { params: paginationParams })
  ).data;
};

const fetchMyRecipes = async (paginationParams?: Partial<PaginationParams & SearchParam>) => {
  return (
    await requestApi<IRecipe[]>('GET', FETCH_MY_RECIPES_API, { params: { ...paginationParams } })
  ).data;
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

const createRecipe = async (formData: FormData) => {
  const userAccessToken = await retrieveToken();

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', config.baseUrl + CREATE_RECIPE_API + `?lang=${i18n.locale}`);

  xhr.setRequestHeader('Authorization', `Bearer ${userAccessToken}`);

  xhr.send(formData);
};

const isFavoriteRecipe = async (recipeId: number) => {
  return (await requestApi<boolean>('GET', `${FETCH_IS_FAVORITE_RECIPE_API}/${recipeId}`)).data;
};

const addRecipeToFavorites = async (recipeId: number) => {
  return (await requestApi('POST', `${ADD_RECIPE_TO_FAVORITES_API}/${recipeId}`)).data;
};

const removeRecipeFromFavorites = async (recipeId: number) => {
  return (await requestApi('POST', `${REMOVE_RECIPE_FROM_FAVORITES_API}/${recipeId}`)).data;
};

const publishRecipe = async (recipeId: number, isPublished: boolean) => {
  return (await requestApi('POST', `${PUBLISH_RECIPE_API}/${recipeId}`, { data: { isPublished } }))
    .data;
};

export const recipeApi = {
  fetchPreviewRecipesByCategoryId,
  fetchRecipeById,
  fetchFavoriteRecipes,
  fetchPreviewRecipes,
  fetchCalculatedRecipeForMealPlanById,
  createRecipe,
  isFavoriteRecipe,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  fetchMyRecipes,
  publishRecipe
};
