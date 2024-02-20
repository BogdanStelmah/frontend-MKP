import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/ui/Button';
import { useUserStore } from '@/store/userStore';

const PersonalInfo = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text>PersonalInfo</Text>
      <Button
        label="Logout"
        type=""
        onPress={() => {
          logout();
          router.push('/introduction');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PersonalInfo;
