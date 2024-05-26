import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import CheckboxGroup, { CheckboxGroupProps } from '@/components/ui/CheckboxGroup/CheckboxGroup';

interface FormCheckboxGroupPropsProps
  extends FormProps,
    Omit<CheckboxGroupProps, 'onChange' | 'selectedValues'> {}

const FormCheckboxGroup: React.FC<FormCheckboxGroupPropsProps> = ({
  name,
  control,
  options,
  extraStylesRadioButton
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
        <CheckboxGroup
          options={options}
          selectedValues={value}
          onChange={onChange}
          extraStylesRadioButton={extraStylesRadioButton}
        />
      )}
    />
  );
};

export default FormCheckboxGroup;
