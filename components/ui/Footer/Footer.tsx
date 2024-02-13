import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import TextSm from '@/components/ui/Typography/TextSm';

interface FooterProps {
  text: string;
  linkText: string;
  onPress: () => void;
  extraStyles?: string;
}

const Footer: React.FC<FooterProps> = ({ text, linkText, onPress, extraStyles }) => {
  return (
    <View className={['flex-row justify-center', extraStyles].join(' ')}>
      <TextSm fontWeight={FontWeightEnum.REGULAR} extraStyles="text-black-greyscale-main">
        {text}
      </TextSm>

      <TextSm
        fontWeight={FontWeightEnum.MEDIUM}
        extraStyles="text-green-secondary-2 pl-1"
        onPress={onPress}>
        {linkText}
      </TextSm>
    </View>
  );
};

export default Footer;
