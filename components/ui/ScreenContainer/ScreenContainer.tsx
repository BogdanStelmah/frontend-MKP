import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: React.ReactNode;
  isTouchableWithoutFeedback?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  isTouchableWithoutFeedback = true
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={isTouchableWithoutFeedback ? Keyboard.dismiss : undefined}
      accessible={false}>
      <View className="h-full bg-background">
        <SafeAreaView>{children}</SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScreenContainer;
