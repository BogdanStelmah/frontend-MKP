import { UsersTypeEnum } from '@/common/enums';

export interface PaginationParams {
  offset: number;
  limit: number;
}

export interface SearchParam {
  searchQuery: string;
}

export interface FilterRecipeParams {
  tagIds: number[];
  categoryIds: number[];
  ingredientIds: number[];
  calorieRange: number[];
  recipeFrom: UsersTypeEnum;
  cookingTime: number[];
}
