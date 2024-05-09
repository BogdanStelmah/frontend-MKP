import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
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
  const { colorScheme } = useColorScheme();

  return (
    <View className="h-[40px] rounded-lg bg-chosen flex justify-center">
      <Button onPress={onPress}>
        <View className="flex-row mx-[8px]">
          <Feather
            name="filter"
            size={24}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />

          {amountOfFilters > 0 && (
            <Text2Sm
              fontWeight={FontWeightEnum.REGULAR}
              extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark"
            >
              ({amountOfFilters})
            </Text2Sm>
          )}
        </View>
      </Button>
    </View>
  );
};

export default FilterButton;
