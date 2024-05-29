import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import RecipeFeed from '../RecipeFeed/RecipeFeed';

import { IPreviewRecipe } from '@/common/entities';
import { useLazyLoadData } from '@/common/hooks';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store/recipeStore';

interface RecipesByCategoryProps {
  onPressOnRecipeHandler: (recipeId: number) => void;
  isUpdate?: boolean;
}

const RecipesByCategory: React.FC<RecipesByCategoryProps> = ({
  onPressOnRecipeHandler,
  isUpdate = false
}) => {
  const isLoading = useRecipeStore.use.isLoading();
  const fetchRecipesByCategory = useRecipeStore.use.fetchRecipesByCategory();
  const fetchFavoriteRecipes = useRecipeStore.use.fetchFavoriteRecipes();

  const [favoriteRecipes, setFavoriteRecipes] = useState<IPreviewRecipe[]>([]);

  useEffect(() => {
    fetchFavoriteRecipes().then((data) => setFavoriteRecipes(data || []));
  }, [isUpdate]);

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

  const [
    recipesByCategory3,
    paginationParamsForRecipesByCategory3,
    loadMoreRecipesByCategory3,
    isLoadingRecipesForRecipesByCategory3
  ] = useLazyLoadData<IPreviewRecipe, any>(3, () =>
    fetchRecipesByCategory(6, paginationParamsForRecipesByCategory3)
  );

  return (
    <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
      <View className="mb-[120px]" onStartShouldSetResponder={() => true}>
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

        <View className="pt-[20px]">
          <RecipeFeed
            title={i18n.t('recipe-search.filters.general-options.in-the-field')}
            recipes={recipesByCategory3}
            isLoading={isLoadingRecipesForRecipesByCategory3}
            onPressOnRecipe={onPressOnRecipeHandler}
            onScrollEndReached={loadMoreRecipesByCategory3}
          />
        </View>

        {favoriteRecipes.length > 0 && (
          <View className="pt-[20px]">
            <RecipeFeed
              title={i18n.t('recipe-search.filters.general-options.favorite')}
              recipes={favoriteRecipes}
              isLoading={isLoading}
              onPressOnRecipe={onPressOnRecipeHandler}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipesByCategory;
