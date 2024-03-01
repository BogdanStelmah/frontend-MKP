import React from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardType } from 'react-native';

import TextInput from './TextInput';

import { FormProps } from '@/common/types';

interface FormTextInputProps extends FormProps {
  placeholder: string;
  label: string;
  maxLength?: number;
  isSecureTextEntry?: boolean;
  extraStyles?: string;
  keyboardType?: KeyboardType;
}

const FormTextInput: React.FC<FormTextInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextInput
          {...props}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default FormTextInput;
