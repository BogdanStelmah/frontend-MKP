import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AxiosError } from 'axios';
import { create } from 'zustand';

import { ISettings, IUser, IUserFullInfo, IUserPersonalInfo } from '@/common/types';
import i18n from '@/i18n';
import { settingApi, userApi, writeToken } from '@/service';
import { removeToken } from '@/service/helper';
import { createSelectors } from '@/store/helper';

type UserState = {
  me: IUserFullInfo | null;
  email: string;
  code: string;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type UserActions = {
  setEmail: (email: UserState['email']) => void;
  login: () => void;
  logout: () => void;
  loginUser: (user: IUser) => Promise<void>;
  googleLoginUser: (idToken: string) => Promise<void>;
  registerUser: (user: IUser) => Promise<void>;
  resetPassword: (email: UserState['email']) => Promise<void>;
  verifyResetCode: (code: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  isUserHasPersonalInfo: () => Promise<boolean | undefined>;
  updateUserInfoByToken: (userInfo: IUserPersonalInfo) => Promise<void>;
  fetchMe: () => Promise<void>;
  updateSettings: (settings: Partial<ISettings>) => Promise<void>;
};

const initialUserState: UserState = {
  me: null,
  email: '',
  code: '',
  isAuthenticated: false,
  isLoading: false
};

export const useUserStoreBase = create<UserState & UserActions>()((set, getState) => ({
  ...initialUserState,

  setEmail: (email) => set(() => ({ email })),

  login: () => set(() => ({ isAuthenticated: true })),

  loginUser: async (user: IUser) => {
    set(() => ({ isLoading: true }));

    try {
      const { access_token } = await userApi.loginUser(user);
      await writeToken(access_token);

      set(() => ({ email: user.email, isAuthenticated: true, isLoading: false }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  googleLoginUser: async (idToken: string) => {
    set(() => ({ isLoading: true }));

    try {
      const { access_token } = await userApi.googleLoginUser(idToken);
      await writeToken(access_token);

      set(() => ({ isAuthenticated: true, isLoading: false }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  logout: async () => {
    set(() => ({ isLoading: true }));

    GoogleSignin.configure({
      scopes: [],
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
    });

    try {
      await removeToken();
      await GoogleSignin.signOut();
    } catch (e) {
      console.error(e);
    } finally {
      set(() => ({ ...initialUserState }));
    }
  },

  registerUser: async (user: IUser) => {
    set(() => ({ isLoading: true }));

    try {
      const { access_token } = await userApi.registerUser(user);
      await writeToken(access_token);

      set(() => ({ email: user.email, isLoading: false }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  resetPassword: async (email: UserState['email']) => {
    set(() => ({ isLoading: true }));

    try {
      await userApi.resetPassword(email);
      set(() => ({ email, isLoading: false }));
    } catch (e) {
      throw Error(i18n.t('validations.email-incorrect'));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  verifyResetCode: async (code: string) => {
    const { email } = getState();
    set(() => ({ isLoading: true }));

    try {
      await userApi.verifyResetCode(email, code);
      set(() => ({ code }));
    } catch (e) {
      throw Error(i18n.t('validations.code-incorrect'));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  changePassword: async (password: string) => {
    const { email, code } = getState();
    set(() => ({ isLoading: true }));

    try {
      await userApi.updatePassword(password, email, code);
      set(() => ({ code: '' }));
    } catch (e) {
      throw Error(i18n.t('validations.code-incorrect'));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  isUserHasPersonalInfo: async () => {
    set(() => ({ isLoading: true }));

    try {
      return await userApi.isUserHasPersonalInfo();
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  updateUserInfoByToken: async (userInfo: IUserPersonalInfo) => {
    set(() => ({ isLoading: true }));

    try {
      await userApi.updateUserInfoByToken(userInfo);

      const { me } = getState();

      if (me) {
        set(() => ({ me: { ...me, ...userInfo } }));
      } else {
        const me = await userApi.fetchMe();
        set(() => ({ me }));
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchMe: async () => {
    set(() => ({ isLoading: true }));

    try {
      const me = await userApi.fetchMe();
      set(() => ({ me }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  updateSettings: async ({ language, theme }) => {
    set(() => ({ isLoading: true }));

    try {
      await settingApi.updateSettingByToken({ language, theme });

      const me = await userApi.fetchMe();
      set(() => ({ me }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  }
}));

export const useUserStore = createSelectors(useUserStoreBase);
