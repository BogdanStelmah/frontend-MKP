import classNames from 'classnames';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInput as DefaultTextInput,
  TextInputFocusEventData,
  TouchableOpacity
} from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import TextXs from '@/components/ui/Typography/TextXs';

export interface TextareaInputProps {
  label: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  extraStyles?: string;
  onChangeText?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  error,
  helperText,
  extraStyles,
  onPress,
  ...props
}) => {
  const styleMap = {
    mainBlock: classNames({
      'h-[84px]': true
    }),
    label: 'inline-block text-brown-camouflage dark:text-black-greyscale-main-dark mb-0.5',
    textInput: classNames(
      {
        'h-[46px]': true,
        'w-full px-3 pb-[2px] rounded-lg': true,
        'font-lato-medium text-black-greyscale-main dark:text-black-greyscale-main-dark text-[15px]':
          true,
        'border border-brown-camouflage dark:border-black-greyscale-main-dark focus:border-yellow-camouflage':
          true,
        'border-red-secondary dark:border-red-secondary-dark': error
      },
      extraStyles
    ),
    errorText: 'text-red-secondary dark:text-red-secondary-dark h-[20px]'
  };

  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity className={styleMap.mainBlock} activeOpacity={100} onPress={onPress}>
      <TextXs fontWeight={FontWeightEnum.MEDIUM} extraStyles={styleMap.label}>
        {label}
      </TextXs>

      <DefaultTextInput
        className={styleMap.textInput}
        placeholderTextColor={colorScheme === 'dark' ? '#827A60' : '#909590'}
        numberOfLines={4}
        autoCapitalize="words"
        {...props}
      />

      {error && (
        <TextXs fontWeight={FontWeightEnum.MEDIUM} extraStyles={styleMap.errorText}>
          {helperText}
        </TextXs>
      )}
    </TouchableOpacity>
  );
};

export default TextareaInput;
