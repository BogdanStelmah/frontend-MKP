import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

import { IPreviewRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import RecipeCard from '@/components/business/RecipeCard/RecipeCard';
import RecipeCardSkeleton from '@/components/ui/Skeletons/RecipeCardSkeleton';
import RecipeFeedSkeleton from '@/components/ui/Skeletons/RecipeFeedSkeleton';
import Text2Md from '@/components/ui/Typography/Text2md';

interface RecipeFeedProps {
  title?: string;
  recipes: IPreviewRecipe[];
  isLoading?: boolean;
  onPressOnRecipe?: (recipeId: number) => void;
  onScrollEndReached?: () => void;
}

const RecipeFeed: React.FC<RecipeFeedProps> = ({
  title,
  recipes,
  isLoading = false,
  onPressOnRecipe = () => {},
  onScrollEndReached = () => {}
}) => {
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;

    const isEndReached = layoutMeasurement.width + contentOffset.x >= contentSize.width - 10;

    if (isEndReached && !isLoading && recipes.length >= 3) onScrollEndReached();
  };

  return (
    <View>
      {title && (
        <Text2Md fontWeight={FontWeightEnum.BOLD} extraStyles="mb-[4px]">
          {title}
        </Text2Md>
      )}

      {isLoading && recipes.length === 0 && <RecipeFeedSkeleton numberOfSkeletons={4} />}

      {recipes.length !== 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={10}
          className="gap-x-[15px]"
          contentContainerStyle={{ paddingRight: 80 }}
        >
          {recipes.map((recipe) => (
            <View key={recipe.id}>
              <RecipeCard recipe={recipe} onPress={() => onPressOnRecipe(recipe.id)} />
            </View>
          ))}

          {isLoading && (
            <View>
              <RecipeCardSkeleton />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default RecipeFeed;
