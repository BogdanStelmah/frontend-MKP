import React from 'react';
import { Image, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Text2md from '@/components/ui/Typography/Text2md';

interface BlockInsteadOfRecipeProps {
  title: string;
}

const BlockInsteadOfRecipe: React.FC<BlockInsteadOfRecipeProps> = ({ title }) => {
  return (
    <View className="w-[100%]">
      <Image
        style={{ height: 200, width: '100%' }}
        source={require('../../../assets/images/slide-1.png')}
        className="rounded-sm opacity-80"
      />

      <View className="items-center mt-1">
        <Text2md
          fontWeight={FontWeightEnum.SEMIBOLD}
          extraStyles="leading-[17px] mt-[2px] mx-[2px] text-placeholder dark:text-brown-camouflage-dark"
        >
          {title}
        </Text2md>
      </View>
    </View>
  );
};

export default BlockInsteadOfRecipe;
