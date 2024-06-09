import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextXsProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const TextXs: React.FC<TextXsProps> = ({ children, extraStyles, fontWeight }) => {
  return (
    <Text
      className={`font-lato-${fontWeight} text-xs text-black-greyscale-main dark:text-black-greyscale-main-dark ${extraStyles}`}
    >
      {children}
    </Text>
  );
};

export default TextXs;
