import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextXsProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const TextXs: React.FC<TextXsProps> = ({ children, extraStyles, fontWeight }) => {
  return <Text className={`font-lato-${fontWeight} text-xs ${extraStyles}`}>{children}</Text>;
};

export default TextXs;
