import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { KeyboardType } from 'react-native';

import TextInput from './TextInput';

interface FormTextInputProps {
  name: string;
  placeholder: string;
  control: Control<any, any> | undefined;
  label: string;
  maxLength?: number;
  isSecureTextEntry?: boolean;
  extraStyles?: string;
  keyboardType?: KeyboardType;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  control,
  placeholder,
  isSecureTextEntry = false,
  extraStyles = '',
  maxLength,
  keyboardType
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextInput
          extraStyles={extraStyles}
          label={label}
          placeholder={placeholder}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          error={!!error}
          helperText={error?.message}
          isSecureTextEntry={isSecureTextEntry}
        />
      )}
    />
  );
};

export default FormTextInput;
