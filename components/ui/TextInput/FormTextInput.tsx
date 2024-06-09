import React from 'react';
import { Controller } from 'react-hook-form';

import TextInput, { TextInputProps } from './TextInput';

import { FormProps } from '@/common/types';

interface FormTextInputProps extends FormProps, TextInputProps {}

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
