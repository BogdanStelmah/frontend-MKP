import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Text2lg from '@/components/ui/Typography/Text2lg';
import TextSm from '@/components/ui/Typography/TextSm';

interface ScreenTitleProps {
  title: string;
  description?: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, description }) => {
  return (
    <View>
      <Text2lg fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="text-black-greyscale-main mb-3">
        {title}
      </Text2lg>

      <TextSm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-black-greyscale-main">
        {description}
      </TextSm>
    </View>
  );
};

export default ScreenTitle;
