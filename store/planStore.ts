import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IPlan } from '@/common/entities';
import { planApi } from '@/service';
import { createSelectors } from '@/store/helper';

type PlaneState = {
  plansForCurrentWeek: IPlan[];
  plansForCurrentYear: IPlan[];
  isLoading: boolean;
};

type PlanActions = {
  fetchPlansForCurrentYear: () => Promise<IPlan[]>;
  fetchPlansForCurrentWeek: () => Promise<IPlan[]>;
  createPlan: (date: Date) => Promise<IPlan | undefined>;
};

const initialPlanState: PlaneState = {
  plansForCurrentWeek: [],
  plansForCurrentYear: [],
  isLoading: false
};

export const usePlanStoreBase = create<PlaneState & PlanActions>()((set, getState) => ({
  ...initialPlanState,

  fetchPlansForCurrentYear: async () => {
    set(() => ({ isLoading: true }));

    try {
      if (getState().plansForCurrentYear.length) {
        return getState().plansForCurrentYear;
      }

      const plansForCurrentYear = await planApi.fetchPlansForCurrentYear();
      set(() => ({ plansForCurrentYear }));

      return plansForCurrentYear;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchPlansForCurrentWeek: async () => {
    set(() => ({ isLoading: true }));

    try {
      if (getState().fetchPlansForCurrentWeek.length) {
        return getState().fetchPlansForCurrentWeek;
      }

      const fetchPlansForCurrentWeek = await planApi.fetchPlansForCurrentWeek();
      set(() => ({ fetchPlansForCurrentWeek }));

      return fetchPlansForCurrentWeek;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  createPlan: async (date) => {
    set(() => ({ isLoading: true }));

    try {
      return await planApi.createPlan(date);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  }
}));

export const usePlanStore = createSelectors(usePlanStoreBase);
