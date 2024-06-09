import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import RadioGroup, { RadioGroupProps } from '@/components/ui/RadioGroup/RadioGroup';

interface FormCheckboxGroupPropsProps
  extends FormProps,
    Omit<RadioGroupProps, 'onSelect' | 'value'> {}

const FormCheckboxGroup: React.FC<FormCheckboxGroupPropsProps> = ({
  name,
  control,
  options,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
        <RadioGroup options={options} value={value} onSelect={onChange} {...props} />
      )}
    />
  );
};

export default FormCheckboxGroup;
