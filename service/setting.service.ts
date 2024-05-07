import { ISettings } from '@/common/types';
import { requestApi } from '@/service/apiAxios';

const UPDATE_SETTING_BY_TOKEN_API = '/setting';

const updateSettingByToken = async (setting: Partial<ISettings>) => {
  return (await requestApi<void>('PATCH', UPDATE_SETTING_BY_TOKEN_API, { data: setting })).data;
};

export const settingApi = {
  updateSettingByToken
};
