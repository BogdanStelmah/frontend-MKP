import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface Text2SmProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
  onPress?: () => void;
}

const Text2Sm: React.FC<Text2SmProps> = ({ children, extraStyles, fontWeight, onPress }) => {
  return (
    <Text
      className={`font-lato-${fontWeight} text-2sm text-black-greyscale-main dark:text-black-greyscale-main-dark ${extraStyles}`}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default Text2Sm;
