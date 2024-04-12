import { MotiView } from 'moti';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { IPreviewRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import RecipeCard from '@/components/business/RecipeCard/RecipeCard';
import Text2Md from '@/components/ui/Typography/Text2md';

interface RecipeFeedProps {
  title?: string;
  recipes: IPreviewRecipe[];
}

const RecipeFeed: React.FC<RecipeFeedProps> = ({ title, recipes }) => {
  return (
    <View>
      {title && (
        <Text2Md fontWeight={FontWeightEnum.BOLD} extraStyles="mb-[4px]">
          {title}
        </Text2Md>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-x-[15px]">
        {recipes.map((recipe) => (
          <View key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default RecipeFeed;
