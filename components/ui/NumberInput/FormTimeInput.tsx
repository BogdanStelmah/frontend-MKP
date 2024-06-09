import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import NumberInput, { NumberInputProps } from '@/components/ui/NumberInput/NumberInput';

interface FormNumberInputProps extends FormProps, NumberInputProps {}

const FormNumberInput: React.FC<FormNumberInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <NumberInput {...props} onChangeText={onChange} onBlur={onBlur} value={value} />
      )}
    />
  );
};

export default FormNumberInput;
