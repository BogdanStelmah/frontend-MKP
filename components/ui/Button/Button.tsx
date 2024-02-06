import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  label: string;
  isDisabled: boolean;
  size?: 'full-width';
  type: string;
  children?: any;
  onPress: any;
  borderRadius?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isDisabled,
  size,
  type,
  children,
  onPress,
  borderRadius
}) => {
  const sizeStyle = size === 'full-width' ? 'w-full' : '';

  const disabledStyle = isDisabled ? (type === 'filled' ? 'bg-blue-disabled' : '') : '';

  const buttonStyle =
    type === 'outlined'
      ? 'border border-blue-primary p-3 w-full'
      : type === 'filled'
        ? 'bg-blue-primary p-3 w-full h-[48px]'
        : 'w-7';

  const textStyle =
    type === 'outlined'
      ? 'font-barlow-semibold text-blue-primary text-md'
      : type === 'filled'
        ? 'font-barlow-semibold text-white-greyscale text-md'
        : 'font-barlow-regular text-grey-greyscale text-xs';

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={['transition', sizeStyle, buttonStyle, disabledStyle, borderRadius].join(' ')}
      disabled={isDisabled}
      onPress={onPress}>
      <View className="flex-row items-center justify-center">
        {children && <View className="mr-2">{children}</View>}
        <Text className={textStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
