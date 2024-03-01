import { AxiosError } from 'axios';

import HttpService from './http.service';

import { IUser } from '@/common/types/types';
import { writeToken } from '@/service/helper';

class UserService extends HttpService {
  registerApi = '/auth/register';
  loginApi = '/auth/login';
  googleLoginApi = '/auth/loginWithGoogle';
  isEmailExistsApi = '/users/isEmailExists';
  resetPasswordApi = '/auth/resetPassword';
  verifyResetCodeApi = '/auth/verifyResetCode';
  updatePasswordApi = '/auth/updatePassword';

  registerUser(user: IUser) {
    return this.register(this.registerApi, user);
  }

  async loginUser(user: any) {
    try {
      const { data } = await this.login(this.loginApi, user);
      await writeToken(data.access_token);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error('Invalid email or password');
      }
    }
  }

  async googleLoginUser(idToken: string) {
    try {
      const { data } = await this.googleLogin(this.googleLoginApi, idToken);
      await writeToken(data.access_token);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error('Problem with google account. Please try again.');
      }
    }
  }

  async resetPassword(email: string) {
    try {
      return await this.post({ email }, this.resetPasswordApi);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    }
  }

  async verifyResetCode(email: string, code: string) {
    try {
      return await this.post({ email, code }, this.verifyResetCodeApi);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    }
  }

  async isEmailExists(email: string) {
    try {
      return await this.get(this.isEmailExistsApi, { email });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message[0]);
      }
    }
  }

  async updatePassword(password: string, email: string, code: string) {
    try {
      return await this.patch({ password, code }, email, this.updatePasswordApi);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    }
  }
}

const userApi = new UserService();
export default userApi;
