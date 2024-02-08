import React from 'react';
import { Control, Controller } from 'react-hook-form';

import TextInput from '@/components/ui/TextInput/TextInput';

interface FormTextInputProps {
  name: string;
  placeholder: string;
  control: Control<any, any> | undefined;
  label: string;
  isSecureTextEntry?: boolean;
  className?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  control,
  placeholder,
  isSecureTextEntry = false,
  className = ''
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextInput
          className={className}
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
