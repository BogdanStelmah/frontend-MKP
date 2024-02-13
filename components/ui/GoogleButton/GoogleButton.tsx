import React from 'react';

import GoogleIcon from '@/assets/icons/google.svg';
import Button from '@/components/ui/Button';
import i18n from '@/i18n';

interface GoogleButtonProps {
  onPress: any;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
  return (
    <Button
      type="outlined"
      isDisabled={false}
      label={i18n.t('sign-in.sign-in-with-google')}
      borderRadius="rounded-lg"
      onPress={onPress}>
      <GoogleIcon />
    </Button>
  );
};

export default GoogleButton;
