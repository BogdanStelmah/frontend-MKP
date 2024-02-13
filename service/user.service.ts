import { AxiosError } from 'axios';

import HttpService from './http.service';

import { IUser } from '@/common/types/types';
import { writeToken } from '@/service/helper';

class UserService extends HttpService {
  constructor() {
    super();
  }

  registerApi = '/auth/register';
  loginApi = '/auth/login';
  googleLoginApi = '/auth/google';
  isEmailExistsApi = '/users/isEmailExists';

  registerUser(user: IUser) {
    return this.register(this.registerApi, user);
  }

  async loginUser(user: any) {
    try {
      const { data } = await this.login(this.loginApi, user);
      writeToken(data.access_token);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
    }
  }

  googleLoginUser() {
    return this.googleLogin(this.loginApi);
  }

  async isEmailExists(email: string) {
    try {
      return await this.get(this.isEmailExistsApi, { email });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400) {
        throw new Error(e.response.data.message[0]);
      }
    }
  }
}

const userApi = new UserService();
export default userApi;
