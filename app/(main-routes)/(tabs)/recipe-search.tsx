import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import RecipeFeed from '@/components/business/RecipeFeed/RecipeFeed';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle';
import { useRecipeStore } from '@/store/recipeStore';

const RecipeSearch = () => {
  const fetchRecipesByCategory = useRecipeStore.use.fetchPreviewRecipes();
  const previewRecipes = useRecipeStore.use.previewRecipes();

  useEffect(() => {
    fetchRecipesByCategory(1).catch((error) => console.error(error.message));
  }, []);

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <TabTitle title="Виберіть рецепт, щоб почати свою трапезу" extraTitleStyles="w-[250px]" />

        <View className="pt-[6px] space-y-[30px]">
          <RecipeFeed title="Перші страви" recipes={previewRecipes} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default RecipeSearch;
