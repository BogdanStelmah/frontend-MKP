import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import RecipeFeed from '@/components/business/RecipeFeed/RecipeFeed';
import { FilterButton } from '@/components/ui/FilterButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import { useRecipeStore } from '@/store/recipeStore';

const RecipeSearch = () => {
  const fetchRecipesByCategory = useRecipeStore.use.fetchPreviewRecipes();
  const isLoading = useRecipeStore.use.isLoading();
  const previewRecipes = useRecipeStore.use.previewRecipes();

  useEffect(() => {
    fetchRecipesByCategory(1).catch((error) => console.error(error.message));
  }, []);

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <TabTitle title="Виберіть рецепт, щоб почати свою трапезу" extraTitleStyles="w-[250px]" />

        <View className="mt-[6px] flex-row">
          <View className="mr-[10px] flex-1">
            <SearchInput placeholder="Знайти рецепт" maxLength={30} />
          </View>

          <FilterButton />
        </View>

        <View className="pt-[20px]">
          <RecipeFeed title="Перші страви" recipes={previewRecipes} isLoading={isLoading} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default RecipeSearch;
