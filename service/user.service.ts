import { IUser, IUserPersonalInfo } from '@/common/types/types';
import { requestApi, requestApiUnauthorized } from '@/service/apiAxios';

const REGISTER_API = '/auth/register';
const LOGIN_API = '/auth/login';
const GOOGLE_LOGIN_API = '/auth/loginWithGoogle';
const RESET_PASSWORD_API = '/auth/resetPassword';
const VERIFY_RESET_CODE_API = '/auth/verifyResetCode';
const UPDATE_PASSWORD_API = '/auth/updatePassword';

const IS_EMAIL_EXISTS_API = '/users/isEmailExists';
const IS_USER_HAS_PERSONAL_INFO_API = '/users/isUserHasPersonalInfo';
const UPDATE_USER_INFO_BY_TOKEN_API = '/users/updateByToken';

export interface IRegisterResult {
  access_token: string;
}

const registerUser = async (user: IUser) => {
  return (await requestApiUnauthorized<IRegisterResult>('POST', REGISTER_API, { data: user })).data;
};

const loginUser = async (user: IUser) => {
  return (await requestApiUnauthorized<IRegisterResult>('POST', LOGIN_API, { data: user })).data;
};

const googleLoginUser = async (idToken: string) => {
  return (
    await requestApiUnauthorized<IRegisterResult>('POST', GOOGLE_LOGIN_API, {
      headers: { Authorization: idToken }
    })
  ).data;
};

const resetPassword = async (email: string) => {
  return (await requestApiUnauthorized<void>('POST', RESET_PASSWORD_API, { data: { email } })).data;
};

const verifyResetCode = async (email: string, code: string) => {
  return (
    await requestApiUnauthorized<boolean>('POST', VERIFY_RESET_CODE_API, { data: { email, code } })
  ).data;
};

const isEmailExists = async (email: string) => {
  return (await requestApiUnauthorized<boolean>('GET', IS_EMAIL_EXISTS_API, { params: { email } }))
    .data;
};

const updatePassword = async (password: string, email: string, code: string) => {
  return (
    await requestApiUnauthorized<void>('PATCH', `${UPDATE_PASSWORD_API}/${email}`, {
      data: { password, code }
    })
  ).data;
};

const updateUserInfoByToken = async (userData: IUserPersonalInfo) => {
  return (await requestApi<void>('PATCH', UPDATE_USER_INFO_BY_TOKEN_API, { data: userData })).data;
};

const isUserHasPersonalInfo = async () => {
  return (await requestApi<boolean>('GET', IS_USER_HAS_PERSONAL_INFO_API)).data;
};

export const userApi = {
  registerUser,
  loginUser,
  googleLoginUser,
  resetPassword,
  verifyResetCode,
  isEmailExists,
  updatePassword,
  isUserHasPersonalInfo,
  updateUserInfoByToken
};
