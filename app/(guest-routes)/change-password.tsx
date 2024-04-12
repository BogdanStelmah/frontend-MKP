import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { changePasswordScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import { FormPasswordInput } from '@/components/ui/PasswordInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import i18n from '@/i18n';
import { useUserStore } from '@/store/userStore';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const SignIn: React.FC = () => {
  const changePassword = useUserStore.use.changePassword();
  const isLoading = useUserStore.use.isLoading();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(changePasswordScheme)
  });

  const redirectToMainRoute = () => router.push('/');

  const onSubmit: SubmitHandler<IFormInput> = async ({ password }) => {
    try {
      await changePassword(password);
      redirectToMainRoute();
    } catch (e: any) {
      setError('password', { message: e?.message });
    }
  };

  return (
    <ScreenContainer>
      <View className="mx-4">
        <ScreenTitle title={i18n.t('change-password.title')} extraStyles="mb-[56px]" />

        <View className="mb-3">
          <FormPasswordInput
            name="password"
            label={i18n.t('change-password.new-password')}
            placeholder={i18n.t('change-password.new-password-placeholder')}
            control={control}
          />
        </View>

        <FormPasswordInput
          name="confirmPassword"
          label={i18n.t('change-password.confirm-new-password')}
          placeholder={i18n.t('change-password.confirm-new-password-placeholder')}
          control={control}
        />

        <View className="mt-10">
          <Button
            label={i18n.t('change-password.change-password')}
            type="filled"
            isDisabled={!isValid}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            borderRadius="rounded-lg"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
