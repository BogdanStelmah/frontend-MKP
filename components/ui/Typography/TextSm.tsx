import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextSmProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const TextSm: React.FC<TextSmProps> = ({ children, extraStyles, fontWeight }) => {
  return <Text className={`font-lato-${fontWeight} text-sm ${extraStyles}`}>{children}</Text>;
};

export default TextSm;
