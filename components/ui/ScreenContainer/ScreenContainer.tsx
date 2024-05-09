import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
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
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <TouchableWithoutFeedback
        onPress={isTouchableWithoutFeedback ? Keyboard.dismiss : undefined}
        accessible={false}
      >
        <View className="h-full bg-background dark:bg-background-dark">
          <SafeAreaView>{children}</SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ScreenContainer;
