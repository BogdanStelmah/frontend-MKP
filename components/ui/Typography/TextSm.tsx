import React from 'react';
import { Text } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';

interface TextSmProps {
  children: React.ReactNode;
  fontWeight: FontWeightEnum;
  extraStyles?: string;
  onPress?: () => void;
}

const TextSm: React.FC<TextSmProps> = ({ children, extraStyles, fontWeight, onPress }) => {
  return (
    <Text className={`font-lato-${fontWeight} text-sm ${extraStyles}`} onPress={onPress}>
      {children}
    </Text>
  );
};

export default TextSm;
