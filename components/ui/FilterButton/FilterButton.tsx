import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Button from '@/components/ui/Button';
import Text2Sm from '@/components/ui/Typography/Text2sm';

interface FilterButtonProps {
  onPress?: () => void;
  amountOfFilters?: number;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress, amountOfFilters = 0 }) => {
  return (
    <View className="h-[40px] rounded-lg bg-chosen flex justify-center">
      <Button onPress={onPress}>
        <View className="flex-row mx-[8px]">
          <Feather name="filter" size={24} color="#4F7942" />

          {amountOfFilters > 0 && (
            <Text2Sm fontWeight={FontWeightEnum.REGULAR} extraStyles="text-green-secondary-2">
              ({amountOfFilters})
            </Text2Sm>
          )}
        </View>
      </Button>
    </View>
  );
};

export default FilterButton;
