import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PersonalInfo = () => {
  return (
    <View style={styles.container}>
      <Text>PersonalInfo</Text>
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
