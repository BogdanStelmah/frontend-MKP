import React, { useState } from 'react';
import { View } from 'react-native';

import { IRecipe } from '@/common/entities';
import { useModal } from '@/common/hooks/useModal';
import { FilterRecipeParams, SearchParam } from '@/common/interfaces';
import { RecipeFiltersType } from '@/common/types';
import { mapperForRecipeFilters } from '@/common/utils';
import { RecipeFilters } from '@/components/business/Recipe/RecipeFilters';
import { RecipeOverviewModal } from '@/components/business/Recipe/RecipeOverviewModal';
import { RecipesByCategory } from '@/components/business/Recipe/RecipesByCategory';
import { RecipesByParameters } from '@/components/business/Recipe/RecipesByParameters';
import { AddRecipeToMealPlanModal } from '@/components/business/RecipeSearch/AddRecipeToMealPlanModal';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store/recipeStore';

const RecipeSearch = () => {
  const [queryParams, setQueryParams] = useState<Partial<SearchParam & FilterRecipeParams>>({
    searchQuery: ''
  });
  const [countSelectedFilters, setCountSelectedFilters] = useState<number>(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const [isRecipeOverviewModalVisible, showRecipeOverviewModal, hideRecipeOverviewModal] =
    useModal();
  const [
    isAddRecipeToMealPlanModalVisible,
    showAddRecipeToMealPlanModal,
    hideAddRecipeToMealPlanModal
  ] = useModal();

  const fetchRecipeById = useRecipeStore.use.fetchRecipeById();
  const fetchIsFavoriteRecipe = useRecipeStore.use.fetchIsFavoriteRecipe();

  const addRecipeToFavorites = useRecipeStore.use.addRecipeToFavorites();
  const removeRecipeFromFavorites = useRecipeStore.use.removeRecipeFromFavorites();

  const recipeById = useRecipeStore.use.recipeById();
  const isFavorite = useRecipeStore.use.isFavoriteRecipe();

  const onPressOnRecipeHandler = (recipeId: number) => {
    fetchIsFavoriteRecipe(recipeId).catch((error) => console.error(error.message));
    fetchRecipeById(recipeId).catch((error) => console.error(error.message));

    setSelectedRecipeId(recipeId);
    showRecipeOverviewModal();
  };

  const handleSetSelectedFilters = (filters: RecipeFiltersType & SearchParam) => {
    setQueryParams(mapperForRecipeFilters(filters));
  };

  const handleCountSelectedFilters = (countFilter: number) => {
    setCountSelectedFilters(countFilter);
  };

  const handlePressAddToReschedule = () => {
    showAddRecipeToMealPlanModal();
  };

  const handlePressAddToFavorites = (recipe: IRecipe) => {
    addRecipeToFavorites(recipe.id).catch((error) => console.error(error.message));
  };

  const handlePressRemoveFromFavorites = (recipe: IRecipe) => {
    removeRecipeFromFavorites(recipe.id).catch((error) => console.error(error.message));
  };

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="mx-4">
        <TabTitle title={i18n.t('recipe-search.tab-title')} extraTitleStyles="w-[250px]" />

        <RecipeFilters
          extraStyles="mt-[6px] flex-row"
          setSelectedNewFilters={handleSetSelectedFilters}
          setFiltersCount={handleCountSelectedFilters}
        />
      </View>

      {queryParams.searchQuery === '' && countSelectedFilters === 0 ? (
        <RecipesByCategory onPressOnRecipeHandler={onPressOnRecipeHandler} isUpdate={isFavorite} />
      ) : (
        <RecipesByParameters
          queryParams={queryParams}
          onPressOnRecipeHandler={onPressOnRecipeHandler}
        />
      )}

      {selectedRecipeId && recipeById && (
        <>
          <RecipeOverviewModal
            isModalVisible={isRecipeOverviewModalVisible}
            isFavorite={isFavorite}
            recipe={recipeById}
            hideModal={hideRecipeOverviewModal}
            onPressAddToReschedule={handlePressAddToReschedule}
            onPressAddToFavorites={handlePressAddToFavorites}
            onPressRemoveFromFavorites={handlePressRemoveFromFavorites}
          />

          <AddRecipeToMealPlanModal
            recipeId={selectedRecipeId}
            hideModal={hideAddRecipeToMealPlanModal}
            isModalVisible={isAddRecipeToMealPlanModalVisible}
          />
        </>
      )}
    </ScreenContainer>
  );
};

export default RecipeSearch;
