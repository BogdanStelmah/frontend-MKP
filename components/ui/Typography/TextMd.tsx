import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextMdProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const TextMd: React.FC<TextMdProps> = ({ children, extraStyles, fontWeight }) => {
  return <Text className={`font-lato-${fontWeight} text-md ${extraStyles}`}>{children}</Text>;
};

export default TextMd;
