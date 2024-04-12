import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { IPreviewRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Text2Xs from '@/components/ui/Typography/Text2xs';

interface RecipeCardProps {
  recipe: IPreviewRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <View className="w-[131px]">
      <Image style={{ height: 82 }} source={{ uri: recipe.imageUrl }} className="rounded-sm" />

      {recipe.title && (
        <Text2Xs
          fontWeight={FontWeightEnum.SEMIBOLD}
          extraStyles="leading-[17px] mt-[2px] mx-[2px]"
        >
          {recipe.title}
        </Text2Xs>
      )}
    </View>
  );
};
export default RecipeCard;
