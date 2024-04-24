import classNames from 'classnames';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { IPreviewRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Text2Xs from '@/components/ui/Typography/Text2xs';

interface RecipeCardProps {
  recipe: IPreviewRecipe;
  size?: 'small' | 'medium';
  onPress?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress, size = 'small' }) => {
  const styleMap = {
    mainBlock: classNames({
      'w-[131px]': size === 'small',
      'w-[100%]': size === 'medium'
    }),
    title: classNames({
      'leading-[17px] mt-[2px] mx-[2px]': true
    })
  };

  return (
    <View className={styleMap.mainBlock}>
      <TouchableOpacity onPress={onPress} activeOpacity={100}>
        <Image style={{ height: 82 }} source={{ uri: recipe.imageUrl }} className="rounded-sm" />

        {recipe.title && (
          <Text2Xs fontWeight={FontWeightEnum.SEMIBOLD} extraStyles={styleMap.title}>
            {recipe.title}
          </Text2Xs>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default RecipeCard;
