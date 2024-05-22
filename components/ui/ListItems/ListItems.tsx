import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { TypeOption } from '@/common/types';
import RadioButton from '@/components/ui/RadioButton';
import Text2md from '@/components/ui/Typography/Text2md';

interface ListItemsProps {
  title: string;
  options: TypeOption[];
  handleOptionSelect: (option: TypeOption) => void;
  isChecked?: boolean;
}

const ListItems: React.FC<ListItemsProps> = ({
  title,
  options,
  handleOptionSelect,
  isChecked = false
}) => {
  return (
    <View>
      <Text2md
        fontWeight={FontWeightEnum.SEMIBOLD}
        extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark mb-1"
      >
        {title}
      </Text2md>

      {options.map((option) => (
        <View className="mb-1" key={option.value + option.label}>
          <RadioButton
            key={option.label}
            option={option}
            onPress={handleOptionSelect}
            checked={isChecked}
          />
        </View>
      ))}
    </View>
  );
};

export default ListItems;
