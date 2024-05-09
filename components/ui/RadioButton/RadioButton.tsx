import classNames from 'classnames';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { TypeOption } from '@/common/types';
import Text2Sm from '@/components/ui/Typography/Text2sm';

interface RadioButtonProps {
  option: TypeOption;
  checked: boolean;
  onPress?: (option: TypeOption) => void;
  extraStyles?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ option, onPress, extraStyles, checked }) => {
  const styleMap = {
    blockStyles: classNames(extraStyles, {
      'flex-row items-center': true
    }),
    radioStyles: classNames({
      'h-[23px] w-[23px] rounded-full border-2 items-center justify-center': true,
      'border-green-secondary dark:border-green-secondary-dark': checked,
      'border-gray-500': !checked
    }),
    insideRadioStyles: classNames({
      'h-[14px] w-[14px] rounded-full bg-green-secondary dark:bg-green-secondary-dark': true
    })
  };

  const handlePress = (option: TypeOption) => {
    onPress && onPress(option);
  };

  return (
    <TouchableOpacity
      className={styleMap.blockStyles}
      key={option.value}
      onPress={() => handlePress(option)}
    >
      <View className={styleMap.radioStyles}>
        {checked && <View className={styleMap.insideRadioStyles} />}
      </View>

      <Text2Sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="ml-[9px]">
        {option.label}
      </Text2Sm>
    </TouchableOpacity>
  );
};

export default RadioButton;
