import React from 'react';
import { Control, Controller } from 'react-hook-form';

import PasswordInput from './PasswordInput';

interface FormPasswordInputProps {
  name: string;
  placeholder: string;
  control: Control<any, any> | undefined;
  label: string;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  name,
  label,
  control,
  placeholder
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <PasswordInput
          label={label}
          placeholder={placeholder}
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
