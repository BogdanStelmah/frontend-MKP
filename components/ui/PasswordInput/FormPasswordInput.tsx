import React from 'react';
import { Controller } from 'react-hook-form';

import PasswordInput from './PasswordInput';

import { FormProps } from '@/common/types';

interface FormPasswordInputProps extends FormProps {
  placeholder: string;
  label: string;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <PasswordInput
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

export default FormPasswordInput;
