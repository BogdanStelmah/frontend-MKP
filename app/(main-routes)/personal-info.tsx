import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { genderDictionary } from '@/common/dictionary';
import { GenderOption } from '@/common/types';
import { partnerPersonalDetails } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormDropdownInput from '@/components/ui/DropdownInput/FormDropdownInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import { useUserStore } from '@/store/userStore';

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderOption;
}

const PersonalInfo = () => {
  const isLoading = useUserStore.use.isLoading();
  const updateUserInfoByToken = useUserStore.use.updateUserInfoByToken();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(partnerPersonalDetails)
  });

  const onSubmit: SubmitHandler<IFormInput> = async ({ firstName, lastName, gender }) => {
    console.log(firstName, lastName, gender.value);
    updateUserInfoByToken({ firstName, lastName, gender: gender.value })
      .then(() => router.push('recipe-search'))
      .catch((message) => setError('gender', { message }));
  };

  return (
    <ScreenContainer>
      <View className="mx-4 pb-4 h-full flex justify-between">
        <View>
          <ScreenTitle
            title="Personal information"
            description="Fill in the fields above. We won't share your personal information anywhere."
          />

          <View className="space-y-1 mt-6">
            <FormTextInput
              name="firstName"
              label="First Name"
              placeholder="e.g. Bohdan"
              control={control}
            />

            <FormTextInput
              name="lastName"
              label="Last Name"
              placeholder="e.g. Dubynchenko"
              control={control}
            />

            <FormDropdownInput
              name="gender"
              label="Стать"
              buttonLabel="Зберегти"
              placeholder="Оберіть свою стать"
              title="Ваша стать"
              options={genderDictionary}
              control={control}
            />
          </View>
        </View>

        <Button
          label="Зберегти"
          type="filled"
          isDisabled={!isValid}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          borderRadius="rounded-lg"
        />
      </View>
    </ScreenContainer>
  );
};

export default PersonalInfo;
