import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios';

import config from '@/config';
import { retrieveToken } from '@/service/helper';

export class InvalidSessionError extends Error {
  constructor() {
    super('Invalid session. Try to login again.');
  }
}

export const API_BASE_URL = config.baseUrl;

export const apiAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const apiAxiosUnauthorized = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

apiAxios.interceptors.request.use(async (requestConfig) => {
  const userAccessToken = await retrieveToken();

  if (!userAccessToken) throw new InvalidSessionError();

  requestConfig.headers = { Authorization: `Bearer ${userAccessToken}` } as AxiosRequestHeaders;

  return requestConfig;
});

export async function requestApi<T = any, D = any>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<T>> {
  return await apiAxios<T, AxiosResponse<T, D>, D>({ ...config, method, url });
}

export async function requestApiUnauthorized<T = any, D = any>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<T>> {
  return await apiAxiosUnauthorized<T, AxiosResponse<T, D>, D>({ ...config, method, url });
}
