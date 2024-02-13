import React from 'react';
import { Control, Controller } from 'react-hook-form';

import TextInput from './TextInput';

interface FormTextInputProps {
  name: string;
  placeholder: string;
  control: Control<any, any> | undefined;
  label: string;
  isSecureTextEntry?: boolean;
  extraStyles?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  control,
  placeholder,
  isSecureTextEntry = false,
  extraStyles = ''
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
