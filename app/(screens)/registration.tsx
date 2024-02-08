import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { registrationScheme } from '@/common/validations/schemes';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import FormTextInput from '@/components/ui/TextInput/FormTextInput';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(registrationScheme)
  });

  const redirectToIntroduction = () => {
    router.navigate('/introduction');
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  return (
    <ScreenContainer>
      <View className="h-[95%]">
        <View className="mx-4">
          <View className="mb-5">
            <BackButton onPress={redirectToIntroduction} />
          </View>

          <ScreenTitle
            title="Реєстрація"
            description="Після заповнення даних у полях вище, ви отримаєте посилання для активації на свою електронну пошту."
          />

          <View className="mt-[56px]">
            <View>
              <FormTextInput
                name="email"
                label="Email"
                placeholder="e.g. bogdan@gmail.com"
                control={control}
              />

              <FormTextInput
                name="password"
                label="Password"
                placeholder="Enter password"
                control={control}
                isSecureTextEntry
              />

              <FormTextInput
                name="confirmPassword"
                label="Confirm password"
                placeholder="Confirm password"
                control={control}
                isSecureTextEntry
              />
            </View>

            <View className="mt-[48px]">
              <Button
                label="Continue"
                type="filled"
                isDisabled={!isValid}
                onPress={handleSubmit(onSubmit)}
                borderRadius="rounded-lg"
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Registration;
