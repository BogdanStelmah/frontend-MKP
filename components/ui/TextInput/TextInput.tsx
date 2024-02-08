import React from 'react';
import { KeyboardType, View, Text, TextInput as DefaultTextInput } from 'react-native';

interface TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  isSecureTextEntry?: boolean;
  maxLength?: number;
  className?: string;
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
  className,
  maxLength,
  autoCapitalize = 'none'
}) => {
  return (
    <View className="h-[96px]">
      <Text
        className="inline-block font-barlow-medium text-grey-greyscale
          font-barlow text-2xs mb-0.5">
        {label}
      </Text>

      <DefaultTextInput
        className={[
          'w-full h-[46px] text-black-main border border-grey-greyscale px-3 py-3.5 rounded-lg text-[15px] focus:border-blue-primary',
          error && 'border-red-secondary',
          className
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

      {error && <Text className="text-red-secondary text-2xs h-[20px]">{helperText}</Text>}
    </View>
  );
};

export default TextInput;
