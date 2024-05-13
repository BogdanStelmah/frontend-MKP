import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IMealPlan, IPlan } from '@/common/entities';
import { isInCurrentWeek } from '@/common/utils';
import { planApi } from '@/service';
import { createSelectors } from '@/store/helper';

type PlaneState = {
  plansForCurrentWeek: IPlan[];
  plansForCurrentYear: IPlan[];
  planBySelectedDate: IPlan | undefined;
  isLoading: boolean;
};

type PlanActions = {
  fetchPlansForCurrentYear: () => Promise<IPlan[]>;
  fetchPlansForCurrentWeek: () => Promise<IPlan[]>;
  fetchPlanByDate: (date: Date) => Promise<IPlan | undefined>;
  createPlan: (date: Date) => Promise<IPlan | undefined>;
  createPlanWithMealPlans: (date: Date, mealPlans: Omit<IMealPlan, 'id'>[]) => Promise<void>;
  deletePlan: (planId: number) => Promise<void>;
  updatePlanWithMealPlans: (
    planId: number,
    date: Date,
    mealPlans: (Partial<IMealPlan> | Omit<IMealPlan, 'id'>)[],
    deletedMealCardIds?: number[]
  ) => Promise<void>;
};

const initialPlanState: PlaneState = {
  plansForCurrentWeek: [],
  plansForCurrentYear: [],
  planBySelectedDate: undefined,
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
        return getState().plansForCurrentWeek;
      }

      const plansForCurrentWeek = await planApi.fetchPlansForCurrentWeek();
      set(() => ({ plansForCurrentWeek }));

      return plansForCurrentWeek;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchPlanByDate: async (date) => {
    set(() => ({ isLoading: true }));

    try {
      const planByDate = await planApi.fetchPlanByDate(date);

      if (planByDate) {
        set(() => ({ planBySelectedDate: planByDate }));
      }

      return planByDate;
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
  },

  createPlanWithMealPlans: async (date, mealPlans) => {
    set(() => ({ isLoading: true }));

    try {
      const newPlan = await planApi.createPlanWithMealPlans(date, mealPlans);

      if (isInCurrentWeek(new Date(newPlan.date))) {
        set(() => ({ plansForCurrentWeek: [...getState().plansForCurrentWeek, newPlan] }));
      } else {
        set(() => ({ plansForCurrentYear: [...getState().plansForCurrentYear, newPlan] }));
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  deletePlan: async (planId) => {
    set(() => ({ isLoading: true }));

    try {
      await planApi.deletePlan(planId);

      set(() => ({
        plansForCurrentWeek: getState().plansForCurrentWeek.filter((plan) => plan.id !== planId),
        plansForCurrentYear: getState().plansForCurrentYear.filter((plan) => plan.id !== planId)
      }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  updatePlanWithMealPlans: async (planId, date, mealPlans, deletedMealCardIds) => {
    set(() => ({ isLoading: true }));

    try {
      await planApi.updatePlanWithMealPlans(planId, date, mealPlans, deletedMealCardIds);

      // TODO: improve this logic
      if (isInCurrentWeek(new Date(date))) {
        await getState().fetchPlansForCurrentWeek();
      } else {
        await getState().fetchPlansForCurrentYear();
      }
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
