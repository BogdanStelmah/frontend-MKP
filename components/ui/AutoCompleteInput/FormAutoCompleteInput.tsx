import React from 'react';
import { Controller } from 'react-hook-form';

import AutoCompleteInput, { AutoCompleteInputProps } from './AutoCompleteInput';

import { FormProps } from '@/common/types';

interface FormAutoCompleteInputProps extends FormProps, AutoCompleteInputProps {}

const FormAutoCompleteInput: React.FC<FormAutoCompleteInputProps> = ({
  name,
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <AutoCompleteInput
          value={value}
          onBlur={onBlur}
          onSuggestionSelect={onChange}
          error={!!error}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default FormAutoCompleteInput;
