import React from 'react';
import { Text, View } from 'react-native';

interface ScreenTitleProps {
  title: string;
  description?: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, description }) => {
  return (
    <View>
      <Text className="font-lato-semibold text-lg text-black-main mb-3">{title}</Text>
      <Text className="font-lato-medium text-sm text-black-main">{description}</Text>
    </View>
  );
};

export default ScreenTitle;
