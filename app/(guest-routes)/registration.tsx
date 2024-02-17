import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { registrationScheme } from '@/common/validations/schemes';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import FormTextInput from '@/components/ui/TextInput/FormTextInput';
import i18n from '@/i18n';
import userApi from '@/service/user.service';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
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
  const redirectToPersonalIno = () => router.push('/personalInfo');

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    setIsLoadingSubmitForm(true);

    const isEmailExists = await userApi.isEmailExists(email);

    if (isEmailExists) {
      setError('email', { message: i18n.t('validations.email-already-exists') });
      setIsLoadingSubmitForm(false);

      return;
    }

    userApi
      .registerUser({ email, password })
      .then((res) => {
        redirectToPersonalIno();
        setIsLoadingSubmitForm(false);
      })
      .catch((error) => console.error(error.message));
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
          </View>
        </View>

        <Button
          label={i18n.t('registration.continue')}
          type="filled"
          isDisabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          borderRadius="rounded-lg"
          extraStyles="mb-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default Registration;
