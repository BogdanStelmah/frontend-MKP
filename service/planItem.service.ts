import { IPlanItem } from '@/common/entities';
import { requestApi } from '@/service/apiAxios';

const FETCH_PLAN_ITEM_BY_DATE_API = '/planItem';

const ADD_CUSTOM_ITEM_API = '/planItem/addCustomItem';
const MARK_ITEM_AS_BOUGHT_API = '/planItem/markItemAsBought';
const MARK_ITEM_AS_NOT_BOUGHT_API = '/planItem/markItemAsNotBought';

const fetchPlanItemByDate = async (date: string | Date): Promise<IPlanItem[]> => {
  return (await requestApi('GET', `${FETCH_PLAN_ITEM_BY_DATE_API}/${date}`)).data;
};

const addCustomItem = async (data: { date: string | Date; name: string }): Promise<IPlanItem> => {
  return (await requestApi('POST', ADD_CUSTOM_ITEM_API, { data })).data;
};

const markItemAsBought = async (itemId: number): Promise<IPlanItem> => {
  return (await requestApi('POST', MARK_ITEM_AS_BOUGHT_API, { data: { itemId } })).data;
};

const markItemAsNotBought = async (itemId: number): Promise<IPlanItem> => {
  return (await requestApi('POST', MARK_ITEM_AS_NOT_BOUGHT_API, { data: { itemId } })).data;
};

export const planItemApi = {
  fetchPlanItemByDate,
  addCustomItem,
  markItemAsBought,
  markItemAsNotBought
};
