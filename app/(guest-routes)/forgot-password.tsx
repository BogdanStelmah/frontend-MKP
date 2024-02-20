import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { forgotPasswordScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import Footer from '@/components/ui/Footer';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
import { useUserStore } from '@/store/userStore';

interface IFormInput {
  email: string;
}

const SignIn: React.FC = () => {
  const resetPassword = useUserStore.use.resetPassword();
  const isLoading = useUserStore.use.isLoading();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordScheme)
  });

  const navigateToCodeVerification = () => router.navigate('/code-verification');

  const onSubmit: SubmitHandler<IFormInput> = async ({ email }) => {
    try {
      await resetPassword(email);
      navigateToCodeVerification();
    } catch (e: any) {
      setError('email', { message: e?.message });
    }
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
            isLoading={isLoading}
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
