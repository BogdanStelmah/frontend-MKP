import React, { useState } from 'react';
import { View } from 'react-native';

import { Option } from '@/common/types';
import RadioButton from '@/components/ui/RadioButton/RadioButton';

interface RadioGroupProps {
  options: Option[];
  onSelect: (selectedOption: Option) => void;
  extraStyles?: string;
  extraStylesRadioButton?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onSelect,
  extraStyles,
  extraStylesRadioButton
}) => {
  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const handlerChecked = (option: Option): boolean => {
    if (selectedOption?.value) return selectedOption?.value === option.value;
    return false;
  };

  return (
    <View className={extraStyles}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          option={option}
          checked={handlerChecked(option)}
          onPress={handleOptionSelect}
          extraStyles={extraStylesRadioButton}
        />
      ))}
    </View>
  );
};

export default RadioGroup;
