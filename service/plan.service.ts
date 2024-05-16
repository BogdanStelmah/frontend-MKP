import { IMealPlan, IPlan } from '@/common/entities';
import { requestApi } from '@/service/apiAxios';

const FETCH_PLANS_FOR_CURRENT_YEAR_API = '/plan/getForCurrentYear';
const FETCH_PLANS_FOR_CURRENT_WEEK_API = '/plan/getForCurrentWeek';
const FETCH_PLAN_BY_DATE_API = '/plan/getByDate';

const CREATE_PLAN_WITH_MEAL_PLANS_API = '/plan/createWithMealPlans';
const CREATE_PLAN_API = '/plan';
const ADD_RECIPE_TO_MEAL_PLAN_API = '/mealPlan/addRecipeToMealPlan';

const DELETE_PLAN_API = '/plan';
const DELETE_RECIPE_FROM_MEAL_PLAN_API = '/mealPlan/deleteRecipeFromMealPlan';

const UPDATE_PLAN_WITH_MEAL_PLANS_API = '/plan';

const fetchPlansForCurrentYear = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_YEAR_API)).data;
};

const fetchPlansForCurrentWeek = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_WEEK_API)).data;
};

const fetchPlanByDate = async (date: Date) => {
  return (await requestApi('GET', `${FETCH_PLAN_BY_DATE_API}/${date}`)).data;
};

const createPlan = async (date: Date) => {
  return (await requestApi('POST', CREATE_PLAN_API, { data: { date } })).data;
};

const createPlanWithMealPlans = async (
  date: Date,
  mealPlans: Omit<IMealPlan, 'id'>[],
  categoryIds: number[]
): Promise<IPlan> => {
  return (await requestApi('POST', CREATE_PLAN_WITH_MEAL_PLANS_API, { data: { date, mealPlans } }))
    .data;
};

const deletePlan = async (planId: number) => {
  return (await requestApi('DELETE', `${DELETE_PLAN_API}/${planId}`)).data;
};

const updatePlanWithMealPlans = async (data: {
  planId: number;
  date: Date;
  mealPlans: Partial<IMealPlan>[];
  categoryIds: number[];
  deletedCategoryIds: number[];
  deletedMealCardIds?: number[];
}) => {
  const { mealPlans, planId, ...rest } = data;

  mealPlans.forEach((mealPlan) => {
    if (!mealPlan.id && !mealPlan.name) throw new Error('Meal plan id or name is required');
  });

  return (
    await requestApi('PATCH', `${UPDATE_PLAN_WITH_MEAL_PLANS_API}/${planId}`, {
      data: { mealPlans, ...rest }
    })
  ).data;
};

const addRecipeToMealPlan = async (data: { recipeId: number; mealPlanId: number }) => {
  return (await requestApi('POST', ADD_RECIPE_TO_MEAL_PLAN_API, { data })).data;
};

const deleteRecipeFromMealPlan = async (data: { recipeToMealPlanId: number }) => {
  return (await requestApi('DELETE', DELETE_RECIPE_FROM_MEAL_PLAN_API, { data })).data;
};

export const planApi = {
  fetchPlansForCurrentYear,
  fetchPlansForCurrentWeek,
  createPlan,
  createPlanWithMealPlans,
  deletePlan,
  updatePlanWithMealPlans,
  fetchPlanByDate,
  addRecipeToMealPlan,
  deleteRecipeFromMealPlan
};
