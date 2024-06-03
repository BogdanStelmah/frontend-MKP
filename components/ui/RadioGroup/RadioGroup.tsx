import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { TypeOption } from '@/common/types';
import RadioButton from '@/components/ui/RadioButton/RadioButton';

export interface RadioGroupProps {
  options: TypeOption[];
  onSelect: (selectedOption: TypeOption) => void;
  value?: TypeOption;
  extraStyles?: string;
  extraStylesRadioButton?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onSelect,
  value,
  extraStyles,
  extraStylesRadioButton
}) => {
  const [selectedOption, setSelectedOption] = useState<TypeOption | undefined>(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleOptionSelect = (option: TypeOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const handlerChecked = (option: TypeOption): boolean => {
    if (selectedOption?.value) return selectedOption?.value.toString() === option.value?.toString();
    return false;
  };

  return (
    <View className={extraStyles}>
      {options.map((option) => (
        <RadioButton
          key={option.label}
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
