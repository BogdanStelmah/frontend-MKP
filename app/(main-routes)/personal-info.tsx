import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { getGenderDictionary } from '@/common/dictionary';
import { GenderOption } from '@/common/types';
import { partnerPersonalDetails } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormDropdownInput from '@/components/ui/DropdownInput/FormDropdownInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import ScreenTitle from '@/components/ui/ScreenTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
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
    setError,
    reset
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(partnerPersonalDetails)
  });

  const onSubmit: SubmitHandler<IFormInput> = async ({ firstName, lastName, gender }) => {
    updateUserInfoByToken({ firstName, lastName, gender: gender.value })
      .then(() => {
        router.push('/recipe-search');
        reset();
      })
      .catch((message) => setError('gender', { message }));
  };

  return (
    <ScreenContainer>
      <View className="mx-4 pb-4 h-full flex justify-between">
        <View>
          <ScreenTitle
            title={i18n.t('personal-info.title')}
            description={i18n.t('personal-info.description')}
          />

          <View className="pt-6 gap-3">
            <View>
              <FormTextInput
                name="firstName"
                label={i18n.t('personal-info.first-name')}
                placeholder={i18n.t('personal-info.first-name-placeholder')}
                control={control}
              />
            </View>

            <View>
              <FormTextInput
                name="lastName"
                label={i18n.t('personal-info.last-name')}
                placeholder={i18n.t('personal-info.last-name-placeholder')}
                control={control}
              />
            </View>

            <View>
              <FormDropdownInput
                name="gender"
                label={i18n.t('personal-info.gender')}
                buttonLabel={i18n.t('personal-info.save')}
                placeholder={i18n.t('personal-info.gender-placeholder')}
                title={i18n.t('personal-info.gender-title')}
                options={getGenderDictionary()}
                control={control}
              />
            </View>
          </View>
        </View>

        <Button
          label={i18n.t('personal-info.save')}
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
