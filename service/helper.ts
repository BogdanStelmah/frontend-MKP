import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error(error);
  }
};

export const writeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error(error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};
