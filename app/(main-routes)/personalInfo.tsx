import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/ui/Button';
import { AuthContext } from '@/context/AuthContext';
import { removeToken } from '@/service/helper';

const PersonalInfo = () => {
  const { logout } = useContext(AuthContext);

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
