import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
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
import userApi from '@/service/user.service';

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();

  const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema)
  });

  const redirectToPersonalIno = () => router.push('/personalInfo');

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    setIsLoadingSubmitForm(true);

    userApi
      .loginUser({ email, password })
      .then((res) => {
        redirectToPersonalIno();
      })
      .catch((error) =>
        setError('password', { message: i18n.t('sign-in.password-or-email-incorrect') })
      )
      .finally(() => setIsLoadingSubmitForm(false));
  };

  return (
    <ScreenContainer>
      <View className="mx-4 h-full flex justify-between">
        <View>
          <ScreenTitle title={i18n.t('sign-in.title')} />

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
              onPress={handleSubmit(onSubmit)}
              borderRadius="rounded-lg"
            />
          </View>

          <TextSm
            fontWeight={FontWeightEnum.MEDIUM}
            extraStyles="text-green-secondary-2 my-4 opacity-70 text-center">
            {i18n.t('sign-in.forgot-password')}
          </TextSm>

          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-disable opacity-60" />
            <TextSm fontWeight={FontWeightEnum.MEDIUM} extraStyles="w-12 text-center text-disable">
              {i18n.t('sign-in.or')}
            </TextSm>
            <View className="flex-1 h-px bg-disable opacity-60" />
          </View>

          <GoogleButton onPress={() => console.log('google')} />
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
