import React, { useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { useModal } from '@/common/hooks/useModal';
import { RecipeOverviewModal } from '@/components/business/RecipeOverviewModal';
import RecipesByCategory from '@/components/business/RecipesByCategory/RecipesByCategory';
import { RecipesByParameters } from '@/components/business/RecipesByParameters';
import { FilterButton } from '@/components/ui/FilterButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store/recipeStore';

const RecipeSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const [isModalVisible, showModal, hideModal] = useModal();

  const fetchRecipeById = useRecipeStore.use.fetchRecipeById();
  const recipeById = useRecipeStore.use.recipeById();

  const onPressOnRecipeHandler = (recipeId: number) => {
    fetchRecipeById(recipeId).catch((error) => console.error(error.message));
    setSelectedRecipeId(recipeId);
    showModal();
  };

  // TODO: Create query builder for recipes

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="mx-4">
        <TabTitle title={i18n.t('recipe-search.tab-title')} extraTitleStyles="w-[250px]" />

        <View className="mt-[6px] flex-row">
          <View className="mr-[10px] flex-1">
            <SearchInput
              placeholder={i18n.t('recipe-search.search-placeholder')}
              maxLength={30}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <FilterButton />
        </View>
      </View>

      {searchText === '' ? (
        <RecipesByCategory onPressOnRecipeHandler={onPressOnRecipeHandler} />
      ) : (
        <RecipesByParameters
          queryParams={debouncedSearchText !== '' && { searchQuery: debouncedSearchText }}
          onPressOnRecipeHandler={onPressOnRecipeHandler}
        />
      )}
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
