import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { TypeOption } from '@/common/types';
import Text2md from '@/components/ui/Typography/Text2md';

interface StandardDropdownInputProps {
  options: TypeOption[];
  value?: TypeOption;
  onSelect: (selectedOption: TypeOption | undefined) => void;
}

const StandardDropdownInput: React.FC<StandardDropdownInputProps> = ({
  value,
  options,
  onSelect
}) => {
  const { colorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TypeOption | undefined>(value);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: TypeOption) => {
    setSelectedOption(option);
    onSelect(option);

    setIsOpen(false);
  };

  return (
    <View className="z-10 w-[200px] items-center">
      <TouchableOpacity onPress={toggleOptions}>
        <View className="flex-row">
          <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="mr-[2px]">
            {selectedOption?.label || 'Виберіть опцію'}
          </Text2md>

          {!isOpen ? (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
            />
          ) : (
            <MaterialIcons
              name="keyboard-arrow-up"
              size={30}
              color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
            />
          )}
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View className="w-full items-center">
          <View className="bg-gray-100 py-[7px] px-[15px] rounded-md absolute">
            {options.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => handleOptionSelect(option)}>
                <Text2md
                  fontWeight={FontWeightEnum.MEDIUM}
                  extraStyles={option.value === selectedOption?.value ? 'opacity-40' : 'opacity-70'}
                >
                  {option.label}
                </Text2md>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default StandardDropdownInput;
