import LottieView from 'lottie-react-native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'full-width';
  type: 'outlined' | 'filled' | string;
  children?: any;
  onPress: any;
  borderRadius?: string;
  extraStyles?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isDisabled = false,
  isLoading = false,
  size,
  type,
  children,
  onPress,
  borderRadius,
  extraStyles
}) => {
  const _isDisabled = isDisabled ? true : isLoading;

  const sizeStyle = size === 'full-width' ? 'w-full' : '';

  const disabledStyle = _isDisabled ? (type === 'filled' ? 'bg-disable' : '') : '';

  const buttonStyle =
    type === 'outlined'
      ? 'border border-green-secondary-2 p-3 h-[48px]'
      : type === 'filled' && 'bg-green-secondary-2 p-3 h-[48px]';

  const textStyle =
    type === 'outlined'
      ? 'font-lato-semibold text-green-secondary-2 text-md'
      : type === 'filled'
        ? 'font-lato-semibold text-white-primary text-md'
        : 'font-lato-regular text-disable text-sm';

  const loaderSrc =
    type === 'filled'
      ? require('../../../assets/lottiefiles/loader_background.json')
      : require('../../../assets/lottiefiles/loader_disable.json');

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={[
        'transition',
        sizeStyle,
        buttonStyle,
        disabledStyle,
        borderRadius,
        extraStyles
      ].join(' ')}
      disabled={_isDisabled}
      onPress={onPress}>
      {isLoading ? (
        <View className="flex justify-center h-full">
          <LottieView autoPlay style={{ height: 17 }} source={loaderSrc} />
        </View>
      ) : (
        <View className="flex-row items-center justify-center">
          {children && <View className="mr-2">{children}</View>}
          <Text className={textStyle}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Button;
