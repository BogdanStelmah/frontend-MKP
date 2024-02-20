import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { changePasswordScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
import { useUserStore } from '@/store/userStore';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const SignIn: React.FC = () => {
  const changePassword = useUserStore((state) => state.changePassword);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(changePasswordScheme)
  });

  const navigateToPersonalInfo = () => router.navigate('/personalInfo');

  const onSubmit: SubmitHandler<IFormInput> = async ({ password }) => {
    try {
      await changePassword(password);
      navigateToPersonalInfo();
    } catch (e: any) {
      setError('password', { message: e?.message });
    }
  };

  return (
    <ScreenContainer>
      <View className="mx-4">
        <ScreenTitle title="Встановлення нового пароль" extraStyles="mb-[56px]" />

        <FormTextInput
          name="password"
          label={i18n.t('registration.password')}
          placeholder={i18n.t('registration.password-placeholder')}
          control={control}
          isSecureTextEntry
        />

        <FormTextInput
          name="confirmPassword"
          label={i18n.t('registration.confirm-password')}
          placeholder={i18n.t('registration.confirm-password-placeholder')}
          control={control}
          isSecureTextEntry
        />

        <View className="mt-7">
          <Button
            label="Змінити"
            type="filled"
            isDisabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            borderRadius="rounded-lg"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
