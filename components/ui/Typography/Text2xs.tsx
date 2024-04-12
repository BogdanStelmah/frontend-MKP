import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface Text2XsProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const Text2Xs: React.FC<Text2XsProps> = ({ children, extraStyles, fontWeight }) => {
  return <Text className={`font-lato-${fontWeight} text-2xs ${extraStyles}`}>{children}</Text>;
};

export default Text2Xs;
