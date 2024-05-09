import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextMdProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const TextMd: React.FC<TextMdProps> = ({ children, extraStyles, fontWeight }) => {
  return (
    <Text
      className={`font-lato-${fontWeight} text-md text-black-greyscale-main dark:text-black-greyscale-main-dark ${extraStyles}`}
    >
      {children}
    </Text>
  );
};

export default TextMd;
