import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  return (
    <View className="h-full bg-background">
      <SafeAreaView className="mt-10">{children}</SafeAreaView>
    </View>
  );
};

export default ScreenContainer;
