import React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity
} from 'react-native';

export interface NumberInputProps {
  value: number;
  onChangeText: (value: number) => void;
  onPress?: (event: GestureResponderEvent) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  extraStyles?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  onPress,
  value,
  onChangeText,
  onBlur,
  extraStyles
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        'border border-brown-camouflage dark:border-brown-camouflage-dark rounded-lg px-[10px] py-[1px] ' +
        extraStyles
      }
    >
      <TextInput
        className="font-lato-medium text-2sm text-black-greyscale-main dark:text-black-greyscale-main-dark "
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => onChangeText(+text || 0)}
        onBlur={onBlur}
      />
    </TouchableOpacity>
  );
};

export default NumberInput;
