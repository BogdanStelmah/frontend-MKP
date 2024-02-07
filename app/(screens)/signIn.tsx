import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>SignIn</Text>
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

export default SignIn;
