import { requestApi } from '@/service/apiAxios';

const FETCH_PLANS_FOR_CURRENT_YEAR = '/plan/getForCurrentYear';
const FETCH_PLANS_FOR_CURRENT_WEEK = '/plan/getForCurrentWeek';
const CREATE_PLAN = '/plan';

const fetchPlansForCurrentYear = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_YEAR)).data;
};

const fetchPlansForCurrentWeek = async () => {
  return (await requestApi('GET', FETCH_PLANS_FOR_CURRENT_WEEK)).data;
};

const createPlan = async (date: Date) => {
  return (await requestApi('POST', CREATE_PLAN, { data: { date } })).data;
};

export const planApi = {
  fetchPlansForCurrentYear,
  fetchPlansForCurrentWeek,
  createPlan
};
