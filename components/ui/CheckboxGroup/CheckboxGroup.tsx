import { View } from 'react-native';

import Checkbox from '@/components/ui/Checkbox/Checkbox';

export interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (newSelectedValues: string[]) => void;
  extraStylesRadioButton?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  extraStylesRadioButton
}) => {
  const handleCheckboxChange = (value: string) => {
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
          key={option.value}
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
