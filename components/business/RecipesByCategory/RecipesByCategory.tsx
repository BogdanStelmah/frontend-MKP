import React from 'react';
import { ScrollView, View } from 'react-native';

import RecipeFeed from '../RecipeFeed/RecipeFeed';

import { IPreviewRecipe } from '@/common/entities';
import { useLazyLoadData } from '@/common/hooks';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store/recipeStore';

interface RecipesByCategoryProps {
  onPressOnRecipeHandler: (recipeId: number) => void;
}

const RecipesByCategory: React.FC<RecipesByCategoryProps> = ({ onPressOnRecipeHandler }) => {
  const fetchRecipesByCategory = useRecipeStore.use.fetchRecipesByCategory();

  const [
    recipesByCategory1,
    paginationParamsForRecipesByCategory1,
    loadMoreRecipesByCategory1,
    isLoadingRecipesForRecipesByCategory1
  ] = useLazyLoadData<IPreviewRecipe, any>(3, () =>
    fetchRecipesByCategory(1, paginationParamsForRecipesByCategory1)
  );

  const [
    recipesByCategory2,
    paginationParamsForRecipesByCategory2,
    loadMoreRecipesByCategory2,
    isLoadingRecipesForRecipesByCategory2
  ] = useLazyLoadData<IPreviewRecipe, any>(3, () =>
    fetchRecipesByCategory(2, paginationParamsForRecipesByCategory2)
  );

  return (
    <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
      <View className="pt-[20px]">
        <RecipeFeed
          title={i18n.t('recipe-search.first-dishes')}
          recipes={recipesByCategory1}
          isLoading={isLoadingRecipesForRecipesByCategory1}
          onPressOnRecipe={onPressOnRecipeHandler}
          onScrollEndReached={loadMoreRecipesByCategory1}
        />
      </View>

      <View className="pt-[20px]">
        <RecipeFeed
          title={i18n.t('recipe-search.main-dishes')}
          recipes={recipesByCategory2}
          isLoading={isLoadingRecipesForRecipesByCategory2}
          onPressOnRecipe={onPressOnRecipeHandler}
          onScrollEndReached={loadMoreRecipesByCategory2}
        />
      </View>
    </ScrollView>
  );
};

export default RecipesByCategory;
