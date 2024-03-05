import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { IGoogleUser } from '@/common/types/types';
import { signInSchema } from '@/common/validations';
import Button from '@/components/ui/Button';
import Footer from '@/components/ui/Footer';
import GoogleButton from '@/components/ui/GoogleButton';
import { FormPasswordInput } from '@/components/ui/PasswordInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import TextSm from '@/components/ui/Typography/TextSm';
import i18n from '@/i18n';
import { useUserStore } from '@/store';

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const isLoading = useUserStore.use.isLoading();
  const googleLoginUser = useUserStore.use.googleLoginUser();
  const loginUser = useUserStore.use.loginUser();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema)
  });

  const redirectToMainRoute = () => router.push('');

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    loginUser({ email, password })
      .then(() => redirectToMainRoute())
      .catch(() =>
        setError('password', { message: i18n.t('sign-in.password-or-email-incorrect') })
      );
  };

  const handleGoogleLogin = ({ idToken }: IGoogleUser) => {
    googleLoginUser(idToken || '')
      .then(() => redirectToMainRoute())
      .catch((error) => console.error(error.message));
  };

  return (
    <ScreenContainer>
      <View className="mx-4 h-full flex justify-between">
        <View>
          <ScreenTitle title={i18n.t('sign-in.title')} extraStyles="mb-[56px]" />

          <FormTextInput
            name="email"
            label={i18n.t('registration.email')}
            placeholder="e.g. bohdan@gmail.com"
            control={control}
          />

          <FormPasswordInput
            name="password"
            label={i18n.t('registration.password')}
            placeholder={i18n.t('registration.password-placeholder')}
            control={control}
          />

          <View className="mt-7">
            <Button
              label={i18n.t('sign-in.sign-in')}
              type="filled"
              isDisabled={!isValid}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
              borderRadius="rounded-lg"
            />
          </View>

          <TextSm
            fontWeight={FontWeightEnum.MEDIUM}
            extraStyles="text-green-secondary-2 my-4 opacity-70 text-center"
            onPress={() => router.navigate('/forgot-password')}
          >
            {i18n.t('sign-in.forgot-password')}
          </TextSm>

          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-disable opacity-60" />
            <TextSm fontWeight={FontWeightEnum.MEDIUM} extraStyles="w-12 text-center text-disable">
              {i18n.t('sign-in.or')}
            </TextSm>
            <View className="flex-1 h-px bg-disable opacity-60" />
          </View>

          <GoogleButton handleGetUserInfo={handleGoogleLogin} />
        </View>

        <Footer
          text={i18n.t('sign-in.dont-have-account')}
          linkText={i18n.t('sign-in.sign-up')}
          onPress={() => router.navigate('/registration')}
          extraStyles="my-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
