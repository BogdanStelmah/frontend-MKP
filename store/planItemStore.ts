import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IPlanItem } from '@/common/entities';
import { planItemApi } from '@/service';
import { createSelectors } from '@/store/helper';

type PlanItemState = {
  planItems: IPlanItem[];
  isLoading: boolean;
};

type PlanItemActions = {
  fetchPlanItems: (date: string | Date) => void;
  addCustomItem: (date: string | Date, name: string) => void;
  markItemAsBought: (itemId: number) => void;
  markItemAsNotBought: (itemId: number) => void;
};

const initialPlanItemState: PlanItemState = {
  planItems: [],
  isLoading: false
};

export const usePlanItemStoreBase = create<PlanItemState & PlanItemActions>()((set, getState) => ({
  ...initialPlanItemState,

  fetchPlanItems: async (date) => {
    set(() => ({ isLoading: true }));

    try {
      const planItems = await planItemApi.fetchPlanItemByDate(date);

      set(() => ({ planItems }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  addCustomItem: async (date, name) => {
    set(() => ({ isLoading: true }));

    try {
      const newItem = await planItemApi.addCustomItem({ date, name });

      set(() => ({
        planItems: [...getState().planItems, newItem]
      }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  markItemAsBought: async (itemId) => {
    set(() => ({ isLoading: true }));

    try {
      const updatedItem = await planItemApi.markItemAsBought(itemId);

      set(() => ({
        planItems: getState().planItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  markItemAsNotBought: async (itemId) => {
    set(() => ({ isLoading: true }));

    try {
      const updatedItem = await planItemApi.markItemAsNotBought(itemId);

      set(() => ({
        planItems: getState().planItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  }
}));

export const usePlanItemStore = createSelectors(usePlanItemStoreBase);
