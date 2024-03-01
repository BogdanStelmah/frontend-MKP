import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface Text2MdProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
}

const Text2Md: React.FC<Text2MdProps> = ({ children, extraStyles, fontWeight }) => {
  return <Text className={`font-lato-${fontWeight} text-2md ${extraStyles}`}>{children}</Text>;
};

export default Text2Md;
