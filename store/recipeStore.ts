import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { PaginationParams } from '@/common/interfaces';
import { recipeApi } from '@/service';
import { createSelectors } from '@/store/helper';

type RecipeState = {
  recipeById: null | IRecipe;
  isLoading: boolean;
};

type RecipeActions = {
  fetchRecipesByCategory: (
    categoryId: string | number,
    paginationParams?: PaginationParams
  ) => Promise<IPreviewRecipe[] | undefined>;
  fetchRecipeById: (recipeId: string | number) => Promise<void>;
};

const initialRecipeState: RecipeState = {
  recipeById: null,
  isLoading: false
};

export const useRecipeStoreBase = create<RecipeState & RecipeActions>()((set, getState) => ({
  ...initialRecipeState,

  fetchRecipesByCategory: async (categoryId, paginationParams) => {
    set(() => ({ isLoading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return await recipeApi.fetchPreviewRecipesByCategoryId(categoryId, paginationParams);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchRecipeById: async (recipeId) => {
    const { recipeById } = getState();

    if (recipeById && recipeById.id === recipeId) return;

    set(() => ({ isLoading: true }));

    try {
      const recipeById = await recipeApi.fetchRecipeById(recipeId);

      set(() => ({ recipeById }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  }
}));

export const useRecipeStore = createSelectors(useRecipeStoreBase);
