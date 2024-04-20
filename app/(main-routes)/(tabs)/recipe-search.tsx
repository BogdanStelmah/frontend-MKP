import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { IPreviewRecipe } from '@/common/entities';
import { useLazyLoadData } from '@/common/hooks';
import { useModal } from '@/common/hooks/useModal';
import RecipeFeed from '@/components/business/RecipeFeed/RecipeFeed';
import { RecipeOverviewModal } from '@/components/business/RecipeOverviewModal';
import { FilterButton } from '@/components/ui/FilterButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store/recipeStore';

const RecipeSearch = () => {
  const [isModalVisible, showModal, hideModal] = useModal();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const fetchRecipesByCategory = useRecipeStore.use.fetchRecipesByCategory();
  const fetchRecipeById = useRecipeStore.use.fetchRecipeById();

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

  const recipeById = useRecipeStore.use.recipeById();

  const onPressOnRecipeHandler = (recipeId: number) => {
    fetchRecipeById(recipeId).catch((error) => console.error(error.message));
    setSelectedRecipeId(recipeId);
    showModal();
  };

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <TabTitle title={i18n.t('recipe-search.tab-title')} extraTitleStyles="w-[250px]" />

        <View className="mt-[6px] flex-row">
          <View className="mr-[10px] flex-1">
            <SearchInput placeholder={i18n.t('recipe-search.search-placeholder')} maxLength={30} />
          </View>

          <FilterButton />
        </View>

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

      {selectedRecipeId && recipeById && (
        <RecipeOverviewModal
          isModalVisible={isModalVisible}
          recipe={recipeById}
          hideModal={hideModal}
        />
      )}
    </ScreenContainer>
  );
};

export default RecipeSearch;
