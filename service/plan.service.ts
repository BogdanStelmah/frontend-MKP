import { IMealPlan, IPlan } from '@/common/entities';
import { requestApi } from '@/service/apiAxios';

const FETCH_PLANS_FOR_CURRENT_YEAR_API = '/plan/getForCurrentYear';
const FETCH_PLANS_FOR_CURRENT_WEEK_API = '/plan/getForCurrentWeek';
const CREATE_PLAN_WITH_MEAL_PLANS_API = '/plan/createWithMealPlans';
const CREATE_PLAN_API = '/plan';
const DELETE_PLAN_API = '/plan';
const UPDATE_PLAN_WITH_MEAL_PLANS_API = '/plan';

const fetchPlansForCurrentYear = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_YEAR_API)).data;
};

const fetchPlansForCurrentWeek = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_WEEK_API)).data;
};

const createPlan = async (date: Date) => {
  return (await requestApi('POST', CREATE_PLAN_API, { data: { date } })).data;
};

const createPlanWithMealPlans = async (
  date: Date,
  mealPlans: Omit<IMealPlan, 'id'>[]
): Promise<IPlan> => {
  return (await requestApi('POST', CREATE_PLAN_WITH_MEAL_PLANS_API, { data: { date, mealPlans } }))
    .data;
};

const deletePlan = async (planId: number) => {
  return (await requestApi('DELETE', `${DELETE_PLAN_API}/${planId}`)).data;
};

const updatePlanWithMealPlans = async (
  planId: number,
  date: Date,
  mealPlans: Partial<IMealPlan>[],
  deletedMealCardIds?: number[]
) => {
  mealPlans.forEach((mealPlan) => {
    if (!mealPlan.id && !mealPlan.name) throw new Error('Meal plan id or name is required');
  });

  return (
    await requestApi('PATCH', `${UPDATE_PLAN_WITH_MEAL_PLANS_API}/${planId}`, {
      data: { date, mealPlans, deletedMealCardIds }
    })
  ).data;
};

export const planApi = {
  fetchPlansForCurrentYear,
  fetchPlansForCurrentWeek,
  createPlan,
  createPlanWithMealPlans,
  deletePlan,
  updatePlanWithMealPlans
};
