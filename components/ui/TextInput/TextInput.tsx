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
  ...props
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity className="h-[84px]" activeOpacity={100} onPress={onPress}>
      <TextXs
        fontWeight={FontWeightEnum.MEDIUM}
        extraStyles="inline-block text-brown-camouflage dark:text-black-greyscale-main-dark mb-0.5"
      >
        {label}
      </TextXs>

      <DefaultTextInput
        className={[
          'font-lato-medium w-full h-[46px] text-black-greyscale-main dark:text-black-greyscale-main-dark border border-brown-camouflage dark:border-black-greyscale-main-dark px-3 pb-[2px] rounded-lg text-[15px] focus:border-yellow-camouflage',
          error && 'border-red-secondary dark:border-red-secondary-dark',
          extraStyles
        ].join(' ')}
        placeholderTextColor={colorScheme === 'dark' ? '#827A60' : '#909590'}
        editable={isEditable}
        secureTextEntry={isSecureTextEntry}
        autoCapitalize={autoCapitalize}
        {...props}
      />

      {error && (
        <TextXs
          fontWeight={FontWeightEnum.MEDIUM}
          extraStyles="text-red-secondary dark:text-red-secondary-dark h-[20px]"
        >
          {helperText}
        </TextXs>
      )}
    </TouchableOpacity>
  );
};

export default TextInput;
