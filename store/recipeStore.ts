import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IPreviewRecipe } from '@/common/entities';
import { recipeApi } from '@/service';
import { createSelectors } from '@/store/helper';

type RecipeState = {
  previewRecipes: IPreviewRecipe[];
  isLoading: boolean;
};

type RecipeActions = {
  fetchPreviewRecipes: (categoryId: string | number) => Promise<void>;
};

const initialRecipeState: RecipeState = {
  previewRecipes: [],
  isLoading: false
};

export const useRecipeStoreBase = create<RecipeState & RecipeActions>()((set, getState) => ({
  ...initialRecipeState,

  fetchPreviewRecipes: async (categoryId: string | number) => {
    set(() => ({ isLoading: true }));

    try {
      const previewRecipes = await recipeApi.fetchPreviewRecipesByCategoryId(categoryId);

      set(() => ({ previewRecipes }));
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
