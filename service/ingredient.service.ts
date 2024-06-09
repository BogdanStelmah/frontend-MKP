import { requestApi } from '@/service/apiAxios';

const FETCH_INGREDIENT_NAME_BY_LANGUAGE_API = '/ingredient/getIngredientNamesByLanguage';
const FETCH_UNIQUE_UNITS_API = '/ingredient/uniqueUnits';

const fetchIngredientNameByLanguage = async () => {
  return (await requestApi('GET', FETCH_INGREDIENT_NAME_BY_LANGUAGE_API)).data;
};

const fetchUniqueUnits = async () => {
  return (await requestApi('GET', FETCH_UNIQUE_UNITS_API)).data;
};

export const ingredientApi = {
  fetchIngredientNameByLanguage,
  fetchUniqueUnits
};
