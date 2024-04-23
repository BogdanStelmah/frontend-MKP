import classNames from 'classnames';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Text2Sm from '@/components/ui/Typography/Text2sm';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  extraStyles?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, extraStyles }) => {
  const styleMap = {
    blockStyles: classNames(extraStyles, {
      'flex-row items-center': true
    }),
    checkboxStyles: classNames({
      'h-[23px] w-[23px] rounded border-2 items-center justify-center': true,
      'border-green-secondary': checked,
      'border-gray-500': !checked
    }),
    insideRadioStyles: classNames({
      'h-[14px] w-[14px] rounded-sm bg-green-secondary': true
    })
  };

  return (
    <TouchableOpacity className={styleMap.blockStyles} onPress={onChange}>
      <View className={styleMap.checkboxStyles}>
        {checked && <View className={styleMap.insideRadioStyles} />}
      </View>

      <Text2Sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="ml-[9px]">
        {label}
      </Text2Sm>
    </TouchableOpacity>
  );
};

export default Checkbox;
