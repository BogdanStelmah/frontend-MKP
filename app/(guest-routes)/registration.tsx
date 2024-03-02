import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { registrationScheme } from '@/common/validations/schemes';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import { FormPasswordInput } from '@/components/ui/PasswordInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import FormTextInput from '@/components/ui/TextInput/FormTextInput';
import i18n from '@/i18n';
import { userApi } from '@/service';
import { useUserStore } from '@/store';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const registerUser = useUserStore.use.registerUser();
  const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(registrationScheme)
  });

  const redirectToBack = () => router.back();
  const redirectToPersonalIno = () => router.push('');

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    setIsLoadingSubmitForm(true);

    const isEmailExists = await userApi.isEmailExists(email);

    if (isEmailExists) {
      setError('email', { message: i18n.t('validations.email-already-exists') });
      setIsLoadingSubmitForm(false);

      return;
    }

    registerUser({ email, password })
      .then(() => {
        redirectToPersonalIno();
        setIsLoadingSubmitForm(false);
      })
      .catch((error) => console.error(error.message))
      .finally(() => setIsLoadingSubmitForm(false));
  };

  return (
    <ScreenContainer>
      <View className="mx-4 h-full flex justify-between">
        <View>
          <View className="mb-5">
            <BackButton onPress={redirectToBack} />
          </View>

          <ScreenTitle
            title={i18n.t('registration.sign-up')}
            description={i18n.t('registration.description')}
          />

          <View className="mt-[56px]">
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

            <FormPasswordInput
              name="confirmPassword"
              label={i18n.t('registration.confirm-password')}
              placeholder={i18n.t('registration.confirm-password-placeholder')}
              control={control}
            />
          </View>
        </View>

        <Button
          label={i18n.t('registration.continue')}
          type="filled"
          isDisabled={!isValid}
          isLoading={isLoadingSubmitForm}
          onPress={handleSubmit(onSubmit)}
          borderRadius="rounded-lg"
          extraStyles="mb-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default Registration;
