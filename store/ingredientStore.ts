import { AxiosError } from 'axios';
import { create } from 'zustand';

import { ingredientApi } from '@/service';
import { createSelectors } from '@/store/helper';

type IngredientState = {
  ingredientNames: string[];
  uniqueUnits: string[];
  isLoading: boolean;
};

type IngredientActions = {
  fetchIngredientNames: () => void;
  fetchUniqueUnits: () => void;
};

const initialPlanItemState: IngredientState = {
  ingredientNames: [],
  uniqueUnits: [],
  isLoading: false
};

export const useIngredientStoreBase = create<IngredientState & IngredientActions>()(
  (set, getState) => ({
    ...initialPlanItemState,

    fetchIngredientNames: async () => {
      set(() => ({ isLoading: true }));

      try {
        const ingredientNames = await ingredientApi.fetchIngredientNameByLanguage();

        set(() => ({ ingredientNames }));
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status) {
          throw new Error(e.response.data.message);
        }
      } finally {
        set(() => ({ isLoading: false }));
      }
    },

    fetchUniqueUnits: async () => {
      set(() => ({ isLoading: true }));

      try {
        const uniqueUnits = await ingredientApi.fetchUniqueUnits();

        set(() => ({ uniqueUnits }));
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status) {
          throw new Error(e.response.data.message);
        }
      } finally {
        set(() => ({ isLoading: false }));
      }
    }
  })
);

export const useIngredientStore = createSelectors(useIngredientStoreBase);
