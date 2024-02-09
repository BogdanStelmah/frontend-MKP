import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  size?: 'full-width';
  type: string;
  children?: any;
  onPress: any;
  borderRadius?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isDisabled = false,
  size,
  type,
  children,
  onPress,
  borderRadius,
  className
}) => {
  const sizeStyle = size === 'full-width' ? 'w-full' : '';

  const disabledStyle = isDisabled ? (type === 'filled' ? 'bg-disable' : '') : '';

  const buttonStyle =
    type === 'outlined'
      ? 'border border-green-secondary-2 p-3'
      : type === 'filled' && 'bg-green-secondary-2 p-3 h-[48px]';

  const textStyle =
    type === 'outlined'
      ? 'font-lato-semibold text-green-secondary-2 text-md'
      : type === 'filled'
        ? 'font-lato-semibold text-white-primary text-md'
        : 'font-lato-regular text-disable text-sm';

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={[
        'transition',
        sizeStyle,
        buttonStyle,
        disabledStyle,
        borderRadius,
        className
      ].join(' ')}
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
