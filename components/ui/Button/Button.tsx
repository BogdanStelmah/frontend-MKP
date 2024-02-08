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

  const disabledStyle = isDisabled ? (type === 'filled' ? 'bg-blue-disabled' : '') : '';

  const buttonStyle =
    type === 'outlined'
      ? 'border border-blue-primary p-3'
      : type === 'filled' && 'bg-blue-primary p-3 h-[48px]';

  const textStyle =
    type === 'outlined'
      ? 'font-barlow-semibold text-blue-primary text-md'
      : type === 'filled'
        ? 'font-barlow-semibold text-white-greyscale text-md'
        : 'font-barlow-regular text-grey-greyscale text-xs';

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
