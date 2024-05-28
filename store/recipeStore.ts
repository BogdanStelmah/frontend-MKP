import { AxiosError } from 'axios';
import { create } from 'zustand';

import { IPreviewRecipe, IRecipe } from '@/common/entities';
import { FilterRecipeParams, PaginationParams, SearchParam } from '@/common/interfaces';
import { ICreateRecipeFormInput } from '@/components/business/MyRecipes/CreateRecipeModal/CreateRecipeModal';
import { recipeApi } from '@/service';
import { createSelectors } from '@/store/helper';

type RecipeState = {
  recipeById: null | IRecipe;
  isFavoriteRecipe: boolean;
  calculatedRecipeForMealPlanById: null | IRecipe;
  isLoading: boolean;
};

type RecipeActions = {
  fetchRecipesByCategory: (
    categoryId: string | number,
    paginationParams?: PaginationParams
  ) => Promise<IPreviewRecipe[] | undefined>;
  fetchFavoriteRecipes: (
    paginationParams?: PaginationParams
  ) => Promise<IPreviewRecipe[] | undefined>;
  fetchRecipeById: (recipeId: string | number) => Promise<void>;
  fetchPreviewRecipes: (
    queryParams: Partial<PaginationParams & SearchParam & FilterRecipeParams>
  ) => Promise<IPreviewRecipe[] | undefined>;
  fetchCalculatedRecipeForMealPlanById: (
    mealPlanToRecipeId: number,
    recipeId: number
  ) => Promise<void>;
  createRecipe: (data: ICreateRecipeFormInput) => Promise<void>;
  fetchIsFavoriteRecipe: (recipeId: number) => Promise<boolean | undefined>;
  addRecipeToFavorites: (recipeId: number) => Promise<void>;
  removeRecipeFromFavorites: (recipeId: number) => Promise<void>;
};

const initialRecipeState: RecipeState = {
  isFavoriteRecipe: false,
  recipeById: null,
  calculatedRecipeForMealPlanById: null,
  isLoading: false
};

export const useRecipeStoreBase = create<RecipeState & RecipeActions>()((set, getState) => ({
  ...initialRecipeState,

  fetchRecipesByCategory: async (categoryId, paginationParams) => {
    set(() => ({ isLoading: true }));

    try {
      return await recipeApi.fetchPreviewRecipesByCategoryId(categoryId, paginationParams);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchFavoriteRecipes: async (paginationParams) => {
    set(() => ({ isLoading: true }));

    try {
      return await recipeApi.fetchFavoriteRecipes(paginationParams);
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
  },

  fetchPreviewRecipes: async (queryParams) => {
    set(() => ({ isLoading: true }));

    try {
      return await recipeApi.fetchPreviewRecipes(queryParams);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchCalculatedRecipeForMealPlanById: async (mealPlanToRecipeId, recipeId) => {
    set(() => ({ isLoading: true }));

    try {
      const calculatedRecipeForMealPlanById = await recipeApi.fetchCalculatedRecipeForMealPlanById({
        mealPlanToRecipeId,
        recipeId
      });

      set(() => ({ calculatedRecipeForMealPlanById }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  createRecipe: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const bodyFormData = new FormData();

      // It is problem with FormData type in React Native (Expo)
      // @ts-ignore
      bodyFormData.append('image', {
        uri: data.imageUri,
        name: 'image.jpeg',
        type: 'image/jpeg'
      });

      bodyFormData.append('title', data.title);
      bodyFormData.append('description', data.description || '');
      bodyFormData.append('cookingInstructions', data.cookingInstructions);
      bodyFormData.append('calorieContent', data.calorieContent.toString());
      bodyFormData.append('weight', data.weight.toString());
      bodyFormData.append('numberOfServings', data.numberOfServings.toString());
      bodyFormData.append('protein', data.protein?.toString() || '');
      bodyFormData.append('fat', data.fat?.toString() || '');
      bodyFormData.append('carbohydrates', data.carbohydrates?.toString() || '');
      bodyFormData.append('cookingTime', data.cookingTime.toString());
      bodyFormData.append('categoryIds', JSON.stringify(data.categoryIds));
      bodyFormData.append('ingredients', JSON.stringify(data.ingredients));

      await recipeApi.createRecipe(bodyFormData);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  fetchIsFavoriteRecipe: async (recipeId) => {
    set(() => ({ isLoading: true }));

    try {
      const result = await recipeApi.isFavoriteRecipe(recipeId);

      set(() => ({ isFavoriteRecipe: result }));

      return result;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  addRecipeToFavorites: async (recipeId) => {
    set(() => ({ isLoading: true }));

    try {
      await recipeApi.addRecipeToFavorites(recipeId);

      set(() => ({ isFavoriteRecipe: true }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status) {
        throw new Error(e.response.data.message);
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },

  removeRecipeFromFavorites: async (recipeId) => {
    set(() => ({ isLoading: true }));

    try {
      await recipeApi.removeRecipeFromFavorites(recipeId);
      set(() => ({ isFavoriteRecipe: false }));
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
