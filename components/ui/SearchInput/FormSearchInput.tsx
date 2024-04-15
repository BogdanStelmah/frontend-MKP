import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import SearchInput from '@/components/ui/SearchInput/SearchInput';

interface FormSearchInputProps extends FormProps {
  placeholder: string;
  label: string;
}

const FormSearchInput: React.FC<FormSearchInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <SearchInput {...props} onChangeText={onChange} onBlur={onBlur} value={value} />
      )}
    />
  );
};

export default FormSearchInput;
