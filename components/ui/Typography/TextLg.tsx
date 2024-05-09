import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface Text2lgProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const Text2lg: React.FC<Text2lgProps> = ({ children, extraStyles, fontWeight }) => {
  return (
    <Text
      className={`font-lato-${fontWeight} text-lg text-black-greyscale-main dark:text-black-greyscale-main-dark ${extraStyles}`}
    >
      {children}
    </Text>
  );
};

export default Text2lg;
