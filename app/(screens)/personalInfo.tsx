import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/ui/Button';
import { removeToken } from '@/service/helper';

const PersonalInfo = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>PersonalInfo</Text>
      <Button
        label="Logout"
        type=""
        onPress={() => {
          removeToken();
          GoogleSignin.signOut();
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
