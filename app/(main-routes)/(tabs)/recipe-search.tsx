import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { useUserStore } from '@/store';

const RecipeSearch = () => {
  const logout = useUserStore.use.logout();

  return (
    <ScreenContainer>
      <Text>RecipeSearch</Text>
      <Button
        label="log out"
        onPress={() => {
          logout();
          router.push('signIn');
        }}
      />
    </ScreenContainer>
  );
};

export default RecipeSearch;
