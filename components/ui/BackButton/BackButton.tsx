import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';

interface BackButtonProps {
  onPress: any;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-7 h-7 flex justify-center">
        <ChevronLeftIcon />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
