import { AxiosRequestHeaders } from 'axios';

import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { FilterRecipeParams, PaginationParams, SearchParam } from '@/common/interfaces';
import config from '@/config';
import { requestApi } from '@/service/apiAxios';
import { retrieveToken } from '@/service/helper';

const FETCH_PREVIEW_RECIPES_BY_CATEGORY_ID_API = '/recipe/getPreviewRecipesByCategoryId';
const FETCH_RECIPE_BY_ID_API = '/recipe/getRecipeById';
const FETCH_CALCULATED_RECIPE_FOR_MEAL_PLAN_BY_ID_API =
  '/mealPlan/getCalculatedRecipeForMealPlanById';
const FETCH_PREVIEW_RECIPES = '/recipe/getPreviewRecipes';

const CREATE_RECIPE_API = '/recipe';

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

const createRecipe = async (formData: FormData) => {
  const userAccessToken = await retrieveToken();

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', config.baseUrl + CREATE_RECIPE_API);

  xhr.setRequestHeader('Authorization', `Bearer ${userAccessToken}`);

  xhr.send(formData);
};

export const recipeApi = {
  fetchPreviewRecipesByCategoryId,
  fetchRecipeById,
  fetchPreviewRecipes,
  fetchCalculatedRecipeForMealPlanById,
  createRecipe
};
