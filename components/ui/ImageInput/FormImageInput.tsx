import React from 'react';
import { Controller } from 'react-hook-form';

import { FormProps } from '@/common/types';
import ImageInput from '@/components/ui/ImageInput/ImageInput';

interface FormImageInputProps extends FormProps {}

const FormImageInput: React.FC<FormImageInputProps> = ({ name, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <ImageInput image={value} setImage={onChange} />
      )}
    />
  );
};

export default FormImageInput;
