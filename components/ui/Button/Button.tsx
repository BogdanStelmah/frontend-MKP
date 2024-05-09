import classNames from 'classnames';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isWarning?: boolean;
  size?: 'full-width';
  type?: 'outlined' | 'filled' | 'text';
  children?: any;
  onPress?: () => void;
  borderRadius?: string;
  extraStyles?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = '',
  isDisabled = false,
  isLoading = false,
  isWarning = false,
  size,
  type = 'text',
  children,
  onPress,
  borderRadius,
  extraStyles
}) => {
  const _isDisabled = isDisabled ? true : isLoading;

  const styleMap = {
    mainBlock: classNames(
      {
        transition: true,
        'w-full': size === 'full-width',
        'border border-green-secondary-2 dark:border-green-secondary-2-dark p-3 h-[48px]':
          type === 'outlined',
        'bg-green-secondary-2 dark:bg-green-secondary-2-dark p-3 h-[48px]': type === 'filled',
        'bg-disable dark:bg-disable-dark': _isDisabled && type === 'filled',

        'border-red-secondary dark:border-red-secondary-dark': type === 'outlined' && isWarning,
        'bg-red-secondary dark:bg-red-secondary-dark': type === 'filled' && isWarning
      },
      borderRadius,
      extraStyles
    ),
    textStyle: classNames({
      'font-lato-semibold text-green-secondary-2 dark:text-green-secondary-2-dark text-md':
        type === 'outlined',
      'font-lato-semibold text-white-primary text-md': type === 'filled',
      'font-lato-regular text-disable dark:text-disable-dark text-sm': type === 'text',

      'text-red-secondary dark:text-red-secondary-dark': type === 'outlined' && isWarning
    })
  };

  const loaderSrc =
    type === 'filled'
      ? require('../../../assets/lottiefiles/loader_background.json')
      : require('../../../assets/lottiefiles/loader_disable.json');

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={styleMap.mainBlock}
      disabled={_isDisabled}
      onPress={onPress}
    >
      {isLoading ? (
        <View className="flex justify-center h-full">
          <LottieView autoPlay style={{ height: 17 }} source={loaderSrc} />
        </View>
      ) : (
        <View className="flex-row items-center justify-center">
          {children && <View className={label && 'mr-2'}>{children}</View>}
          <Text className={styleMap.textStyle}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Button;
