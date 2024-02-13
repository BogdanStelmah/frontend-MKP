import React from 'react';
import { KeyboardType, TextInput as DefaultTextInput, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import TextXs from '@/components/ui/Typography/TextXs';

interface TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  isSecureTextEntry?: boolean;
  maxLength?: number;
  extraStyles?: string;
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: any;
  onBlur?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  error,
  helperText,
  onChangeText,
  onBlur,
  value,
  isSecureTextEntry = false,
  keyboardType,
  extraStyles,
  maxLength,
  autoCapitalize = 'none'
}) => {
  return (
    <View className="h-[96px]">
      <TextXs
        fontWeight={FontWeightEnum.MEDIUM}
        extraStyles="inline-block text-brown-camouflage mb-0.5">
        {label}
      </TextXs>

      <DefaultTextInput
        className={[
          'font-lato-medium w-full h-[46px] text-black-greyscale-main border border-brown-camouflage px-3 py-3.5 rounded-lg text-[15px] focus:border-yellow-camouflage',
          error && 'border-red-secondary',
          extraStyles
        ].join(' ')}
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />

      {error && (
        <TextXs fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-red-secondary h-[20px]">
          {helperText}
        </TextXs>
      )}
    </View>
  );
};

export default TextInput;
