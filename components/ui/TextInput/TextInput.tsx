import classNames from 'classnames';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  GestureResponderEvent,
  KeyboardType,
  NativeSyntheticEvent,
  TextInput as DefaultTextInput,
  TextInputFocusEventData,
  TouchableOpacity
} from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import TextXs from '@/components/ui/Typography/TextXs';

export interface TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  isSecureTextEntry?: boolean;
  isEditable?: boolean;
  isMultiline?: boolean;
  maxLength?: number;
  extraStyles?: string;
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  isSecureTextEntry = false,
  autoCapitalize = 'none',
  extraStyles,
  isEditable = true,
  onPress,
  isMultiline = false,
  ...props
}) => {
  const styleMap = {
    mainBlock: classNames({
      'h-auto': true
    }),
    label: 'inline-block text-brown-camouflage dark:text-black-greyscale-main-dark mb-0.5',
    textInput: classNames(
      {
        'h-[46px] pb-[2px]': !isMultiline,
        'min-h-[84px] py-[12px]': isMultiline,
        'w-full px-3 rounded-lg': true,
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
        multiline={!isSecureTextEntry}
        placeholderTextColor={colorScheme === 'dark' ? '#827A60' : '#909590'}
        editable={isEditable}
        secureTextEntry={isSecureTextEntry}
        autoCapitalize={autoCapitalize}
        numberOfLines={isMultiline ? 4 : 1}
        textAlignVertical={isMultiline ? 'top' : 'center'}
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

export default TextInput;
