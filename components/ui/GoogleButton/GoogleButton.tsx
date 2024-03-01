import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';

import GoogleIcon from '@/assets/icons/google.svg';
import { IGoogleUser } from '@/common/types/types';
import Button from '@/components/ui/Button';
import i18n from '@/i18n';
interface GoogleButtonProps {
  handleGetUserInfo: (userInfo: IGoogleUser) => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ handleGetUserInfo }) => {
  GoogleSignin.configure({
    scopes: [],
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
  });

  const handleSignInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      handleGetUserInfo(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Button
      type="outlined"
      isDisabled={false}
      label={i18n.t('sign-in.sign-in-with-google')}
      borderRadius="rounded-lg"
      onPress={handleSignInWithGoogle}
    >
      <GoogleIcon />
    </Button>
  );
};

export default GoogleButton;
