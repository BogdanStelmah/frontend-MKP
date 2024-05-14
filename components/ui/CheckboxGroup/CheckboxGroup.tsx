import React from 'react';
import { View } from 'react-native';

import { TypeOption } from '@/common/types';
import Checkbox from '@/components/ui/Checkbox/Checkbox';

export type CheckboxValue = string | number | number[] | undefined;

export interface CheckboxGroupProps {
  options: TypeOption[];
  selectedValues: CheckboxValue[];
  onChange: (newSelectedValues: CheckboxValue[]) => void;
  extraStylesRadioButton?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  extraStylesRadioButton
}) => {
  const handleCheckboxChange = (value: string | number | number[] | undefined) => {
    const newSelectedValues = [...selectedValues];
    const index = newSelectedValues.indexOf(value);

    if (index > -1) {
      newSelectedValues.splice(index, 1);
    } else {
      newSelectedValues.push(value);
    }

    onChange(newSelectedValues);
  };

  return (
    <View>
      {options.map((option) => (
        <Checkbox
          key={option.label}
          label={option.label}
          checked={selectedValues.includes(option.value)}
          onChange={() => handleCheckboxChange(option.value)}
          extraStyles={extraStylesRadioButton}
        />
      ))}
    </View>
  );
};

export default CheckboxGroup;
