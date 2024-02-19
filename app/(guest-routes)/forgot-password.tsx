import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { forgotPasswordScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import Footer from '@/components/ui/Footer';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
import userApi from '@/service/user.service';

interface IFormInput {
  email: string;
}

const SignIn: React.FC = () => {
  const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordScheme)
  });

  const onSubmit: SubmitHandler<IFormInput> = async ({ email }) => {
    setIsLoadingSubmitForm(true);

    userApi
      .resetPassword(email)
      .then(() => router.navigate('/code-verification'))
      .catch(() => setError('email', { message: i18n.t('validations.email-incorrect') }))
      .finally(() => setIsLoadingSubmitForm(false));
  };

  return (
    <ScreenContainer>
      <View className="mx-4">
        <ScreenTitle
          title={i18n.t('forgot-password.title')}
          description={i18n.t('forgot-password.description')}
          extraStyles="mb-[56px]"
        />

        <FormTextInput
          name="email"
          label={i18n.t('registration.email')}
          placeholder="e.g. bohdan@gmail.com"
          control={control}
        />

        <View className="mt-7">
          <Button
            label={i18n.t('forgot-password.reset-password')}
            type="filled"
            isDisabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            borderRadius="rounded-lg"
          />
        </View>

        <Footer
          text={i18n.t('forgot-password.remember-your-password')}
          linkText={i18n.t('forgot-password.back-to-sign-in')}
          onPress={() => router.navigate('/signIn')}
          extraStyles="my-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
