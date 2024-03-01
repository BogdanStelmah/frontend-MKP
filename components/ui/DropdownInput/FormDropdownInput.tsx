import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps, TypeOption } from '@/common/types';
import DropdownInput from '@/components/ui/DropdownInput/DropdownInput';

interface FormPasswordInputProps extends FormProps {
  title: string;
  label: string;
  buttonLabel: string;
  options: TypeOption[];
  placeholder: string;
}

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
