import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import DropdownInput, { DropdownInputProps } from '@/components/ui/DropdownInput/DropdownInput';

interface FormPasswordInputProps
  extends FormProps,
    Omit<DropdownInputProps, 'value' | 'onSelect'> {}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DropdownInput {...props} value={value} onSelect={onChange} />
      )}
    />
  );
};

export default FormPasswordInput;
