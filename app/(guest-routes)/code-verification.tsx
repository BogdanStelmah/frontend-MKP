import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { codeVerificationScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
import userApi from '@/service/user.service';

interface IFormInput {
  code: string;
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
    resolver: yupResolver(codeVerificationScheme)
  });

  const redirectToPersonalIno = () => router.push('/personalInfo');

  const onSubmit: SubmitHandler<IFormInput> = async ({ code }) => {
    setIsLoadingSubmitForm(true);

    // TODO: Add state management
    // userApi
    //   .verifyResetCode('email', code)
    //   .then(() => redirectToPersonalIno())
    //   .catch(() => setError('code', { message: i18n.t('validations.email-incorrect') }))
    //   .finally(() => setIsLoadingSubmitForm(false));
  };

  return (
    <ScreenContainer>
      <View className="mx-4">
        <ScreenTitle
          title={i18n.t('code-verification.title')}
          description={i18n.t('code-verification.description')}
          extraStyles="mb-[56px]"
        />

        <FormTextInput
          name="code"
          label={i18n.t('code-verification.code')}
          placeholder="XXXXXX"
          control={control}
          maxLength={6}
          keyboardType="numeric"
        />

        <View className="mt-7">
          <Button
            label={i18n.t('code-verification.verify')}
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
