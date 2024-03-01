import React, { useState } from 'react';
import { View } from 'react-native';

import EyeOffIcon from '../../../assets/icons/eye-off.svg';
import EyeIcon from '../../../assets/icons/eye.svg';

import Button from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  onChangeText?: any;
  onBlur?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  error,
  helperText
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const showPassword = () => {
    setIsSecureTextEntry(false);
  };

  const hidePassword = () => {
    setIsSecureTextEntry(true);
  };

  return (
    <View>
      <TextInput
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        error={error}
        helperText={helperText}
        isSecureTextEntry={isSecureTextEntry}
        extraStyles="pr-[55px]"
      />
      <View className="absolute top-[30px] right-2">
        {isSecureTextEntry ? (
          <Button onPress={showPassword}>
            <EyeIcon />
          </Button>
        ) : (
          <Button onPress={hidePassword}>
            <EyeOffIcon />
          </Button>
        )}
      </View>
    </View>
  );
};

export default PasswordInput;
