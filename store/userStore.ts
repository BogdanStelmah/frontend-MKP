import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { create } from 'zustand';

import i18n from '@/i18n';
import { removeToken } from '@/service/helper';
import userApi from '@/service/user.service';
import { createSelectors } from '@/store/helper';

type UserState = {
  email: string;
  code: string;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type UserActions = {
  setEmail: (email: UserState['email']) => void;
  login: () => void;
  logout: () => void;
  resetPassword: (email: UserState['email']) => Promise<void>;
  verifyResetCode: (code: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
};

const initialUserState: UserState = {
  email: '',
  code: '',
  isAuthenticated: false,
  isLoading: false
};

export const useUserStoreBase = create<UserState & UserActions>()((set, getState) => ({
  ...initialUserState,

  setEmail: (email) => set(() => ({ email })),

  login: () => set(() => ({ isAuthenticated: true })),

  logout: async () => {
    set(() => ({ isLoading: true }));
    await removeToken();
    await GoogleSignin.signOut();

    set(() => ({ ...initialUserState }));
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
  }
}));

export const useUserStore = createSelectors(useUserStoreBase);
