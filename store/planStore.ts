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
  isLoadedPlansForCurrentYear: boolean;
};

type PlanActions = {
  fetchPlansForCurrentYear: () => Promise<IPlan[]>;
  fetchPlansForCurrentWeek: () => Promise<IPlan[]>;
  fetchPlanByDate: (date: Date) => Promise<IPlan | undefined>;
  createPlan: (date: Date) => Promise<IPlan | undefined>;
  createPlanWithMealPlans: (
    date: Date,
    mealPlans: Omit<IMealPlan, 'id'>[],
    categoryIds: number[]
  ) => Promise<void>;
  deletePlan: (planId: number) => Promise<void>;
  updatePlanWithMealPlans: (data: {
    planId: number;
    date: Date;
    mealPlans: (Partial<IMealPlan> | Omit<IMealPlan, 'id'>)[];
    categoryIds: number[];
    deletedCategoryIds: number[];
    deletedMealCardIds?: number[];
  }) => Promise<void>;
  addRecipeToMealPlan: (recipeId: number, mealPlanId: number) => Promise<void>;
  deleteRecipeFromMealPlan: (recipeToMealPlanId: number) => Promise<void>;
};

const initialPlanState: PlaneState = {
  plansForCurrentWeek: [],
  plansForCurrentYear: [],
  planBySelectedDate: undefined,
  isLoading: false,
  isLoadedPlansForCurrentYear: true
};

export const usePlanStoreBase = create<PlaneState & PlanActions>()((set, getState) => ({
  ...initialPlanState,

  fetchPlansForCurrentYear: async () => {
    set(() => ({ isLoadedPlansForCurrentYear: true }));

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
      set(() => ({ isLoadedPlansForCurrentYear: false }));
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
      } else {
        set(() => ({ planBySelectedDate: undefined }));
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

  createPlanWithMealPlans: async (date, mealPlans, categoryIds) => {
    set(() => ({ isLoading: true }));

    try {
      const newPlan = await planApi.createPlanWithMealPlans(date, mealPlans, categoryIds);

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

  updatePlanWithMealPlans: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      await planApi.updatePlanWithMealPlans(data);

      // TODO: improve this logic
      if (isInCurrentWeek(new Date(data.date))) {
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
  },

  addRecipeToMealPlan: async (recipeId, mealPlanId) => {
    set(() => ({ isLoading: true }));

    try {
      await planApi.addRecipeToMealPlan({ recipeId, mealPlanId });
      await getState().fetchPlansForCurrentWeek();
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  deleteRecipeFromMealPlan: async (recipeToMealPlanId) => {
    set(() => ({ isLoading: true }));

    try {
      await planApi.deleteRecipeFromMealPlan({ recipeToMealPlanId });
      await getState().fetchPlansForCurrentWeek();
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
