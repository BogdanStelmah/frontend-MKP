import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Text2lg from '@/components/ui/Typography/Text2lg';
import TextSm from '@/components/ui/Typography/TextSm';

interface ScreenTitleProps {
  title: string;
  description?: string;
  extraStyles?: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, description, extraStyles }) => {
  return (
    <View className={extraStyles}>
      <Text2lg fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="text-black-greyscale-main">
        {title}
      </Text2lg>

      {description && (
        <TextSm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-black-greyscale-main mt-3">
          {description}
        </TextSm>
      )}
    </View>
  );
};

export default ScreenTitle;
