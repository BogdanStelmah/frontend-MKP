import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import RecipeCard from '../../../components/business/Recipe/RecipeCard/RecipeCard';
import BlockInsteadOfRecipe from '../../../components/ui/BlockInsteadOfRecipe/BlockInsteadOfRecipe';
import RecipeListSkeleton from '../../../components/ui/Skeletons/RecipeListSkeleton';

import { useModal } from '@/common/hooks';
import { CreateRecipeModal } from '@/components/business/MyRecipes/CreateRecipeModal';
import { RecipeOverviewModal } from '@/components/business/Recipe/RecipeOverviewModal';
import { AddRecipeToMealPlanModal } from '@/components/business/RecipeSearch/AddRecipeToMealPlanModal';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store';

const MyRecipes: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);

  const [isRecipeOverviewModalVisible, showRecipeOverviewModal, hideRecipeOverviewModal] =
    useModal();

  const [debouncedSearchText] = useDebounce(searchText, 1000);

  const isLoading = useRecipeStore.use.isLoading();
  const recipeById = useRecipeStore.use.recipeById();
  const myRecipes = useRecipeStore.use.myRecipes();

  const fetchMyRecipes = useRecipeStore.use.fetchMyRecipes();
  const fetchRecipeById = useRecipeStore.use.fetchRecipeById();
  const publishRecipe = useRecipeStore.use.publishRecipe();

  const [
    isAddRecipeToMealPlanModalVisible,
    showAddRecipeToMealPlanModal,
    hideAddRecipeToMealPlanModal
  ] = useModal();
  const [isCreateModalVisible, showCreateModal, hideCreateModal] = useModal();

  const getMyRecipes = async () => {
    await fetchMyRecipes({ searchQuery: debouncedSearchText });
  };

  useEffect(() => {
    getMyRecipes();
  }, [debouncedSearchText]);

  const onPressOnRecipeHandler = (recipeId: number) => {
    fetchRecipeById(recipeId).catch((error) => console.error(error.message));

    setSelectedRecipeId(recipeId);
    showRecipeOverviewModal();
  };

  const handlePressAddToReschedule = () => {
    showAddRecipeToMealPlanModal();
  };

  const handlePublishRecipe = (recipeId: number) => {
    setIsLoadingPublish(true);

    publishRecipe(recipeId, true)
      .then(() => {
        setIsLoadingPublish(false);
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <ScreenContainer isTouchableWithoutFeedback>
      <View className="mx-4">
        <TabTitle title={i18n.t('my-recipes.tab-title')} extraTitleStyles="w-[240px]" />

        <View className="mt-[6px]">
          <SearchInput
            placeholder={i18n.t('recipe-search.search-placeholder')}
            maxLength={30}
            value={searchText}
            onChangeText={setSearchText}
          />

          <Button
            label={i18n.t('my-recipes.create-recipe-button')}
            type="outlined"
            borderRadius="border-0"
            extraStyles="mt-2"
            onPress={showCreateModal}
          />
        </View>

        {myRecipes.length === 0 && !isLoading && (
          <BlockInsteadOfRecipe title={i18n.t('my-recipes.not-have-any-recipes')} />
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-40">
        {!isLoading && myRecipes.length !== 0 && (
          <View className="flex-wrap flex-row mx-4 mt-2" onStartShouldSetResponder={() => true}>
            {myRecipes.map((recipe, index) => (
              <View
                key={recipe.id}
                className={index % 2 !== 1 ? 'pr-2 w-[50%] mb-4' : 'pl-2 w-[50%] mb-4'}
              >
                <RecipeCard
                  recipe={recipe}
                  onPress={() => onPressOnRecipeHandler(recipe.id)}
                  size="medium"
                />
              </View>
            ))}
          </View>
        )}

        {isLoading && <RecipeListSkeleton numberOfSkeletons={16} />}
      </ScrollView>

      <CreateRecipeModal
        hideModal={hideCreateModal}
        isModalVisible={isCreateModalVisible}
        onSubmitCreateRecipe={getMyRecipes}
      />

      {selectedRecipeId && recipeById && (
        <>
          <RecipeOverviewModal
            isModalVisible={isRecipeOverviewModalVisible}
            isYourRecipe
            isLoading={isLoadingPublish}
            recipe={recipeById}
            hideModal={hideRecipeOverviewModal}
            onPressAddToReschedule={handlePressAddToReschedule}
            onPublishRecipe={handlePublishRecipe}
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

export default MyRecipes;
