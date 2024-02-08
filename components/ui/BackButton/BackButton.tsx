import React from 'react';
import { TouchableOpacity } from 'react-native';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';

interface BackButtonProps {
  onPress: any;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity className="w-[10px]" onPress={onPress}>
      <ChevronLeftIcon />
    </TouchableOpacity>
  );
};

export default BackButton;
