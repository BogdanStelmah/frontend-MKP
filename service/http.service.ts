import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { retrieveToken, writeToken } from './helper';
import config from '../config';

import { IUser } from '@/common/types/types';

export class HttpService {
  fetchingService: AxiosInstance;
  fetchingServiceWithHeaders: AxiosInstance;
  baseUrl: string;

  constructor(baseUrl = config.baseUrl) {
    this.fetchingService = axios;
    this.fetchingServiceWithHeaders = this.authAxios;
    this.baseUrl = baseUrl;
  }

  authAxios = axios.create({
    headers: { token: async () => await retrieveToken() }
  });

  private getFullApiUrl(specificApiRoute: string) {
    return `${this.baseUrl}${specificApiRoute}`;
  }

  async get(apiVersion: string, params: any): Promise<any> {
    const res = await this.fetchingServiceWithHeaders.get(this.getFullApiUrl(apiVersion), {
      params
    });
    return res.data;
  }

  async post(data: any, apiVersion: string) {
    const res = await this.fetchingServiceWithHeaders.post(this.getFullApiUrl(apiVersion), data);
    return res.data;
  }

  async put(data: any, id: string, apiVersion: string) {
    const res = await this.fetchingServiceWithHeaders.put(
      this.getFullApiUrl(apiVersion) + `/${id}`,
      data
    );
    return res.data;
  }

  async patch(data: any, id: string, apiVersion: string) {
    const res = await this.fetchingServiceWithHeaders.patch(
      this.getFullApiUrl(apiVersion) + `/${id}`,
      data
    );
    return res.data;
  }

  async delete(id: string, apiVersion: string) {
    const res = await this.fetchingServiceWithHeaders.delete(
      this.getFullApiUrl(apiVersion) + `/${id}`
    );
    return res.data;
  }

  async login(apiVersion: string, user: IUser) {
    return await this.fetchingService.post(this.getFullApiUrl(apiVersion), user);
  }

  async googleLogin(apiVersion: string, token: string) {
    return await this.fetchingService.post(
      this.getFullApiUrl(apiVersion),
      {},
      { headers: { Authorization: token } }
    );
  }

  async register(apiVersion: string, user: IUser) {
    try {
      const { data } = await this.fetchingService.post(this.getFullApiUrl(apiVersion), user);

      await writeToken(data.access_token);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400) {
        throw new Error(e.response.data.message);
      }
    }
  }
}

export default HttpService;
