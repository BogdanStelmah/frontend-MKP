import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { getGenderDictionary } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import { GenderOption } from '@/common/types';
import { partnerPersonalDetails } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormDropdownInput from '@/components/ui/DropdownInput/FormDropdownInput';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';
import { useUserStore } from '@/store';

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderOption;
}

const PersonalInfoForm = () => {
  const [showSaveButton, setShowSaveButton] = useState(false);

  const isLoading = useUserStore.use.isLoading();
  const me = useUserStore.use.me();

  const updateUserInfoByToken = useUserStore.use.updateUserInfoByToken();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
    watch,
    setValue
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(partnerPersonalDetails)
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (me) {
      setValue('firstName', me.firstName);
      setValue('lastName', me.lastName);

      const genderOption = getGenderDictionary().find((gender) => gender.value === me.gender);
      if (genderOption) setValue('gender', genderOption);
    }
  }, [me]);

  useEffect(() => {
    if (isLoading) return;

    if (
      watchAllFields?.firstName !== me?.firstName ||
      watchAllFields?.lastName !== me?.lastName ||
      watchAllFields?.gender?.value !== me?.gender
    ) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [watchAllFields]);
  const onSubmitPersonalInfo: SubmitHandler<IFormInput> = async ({
    firstName,
    lastName,
    gender
  }) => {
    updateUserInfoByToken({ firstName, lastName, gender: gender.value })
      .then(() => {
        setShowSaveButton(false);
      })
      .catch((message) => setError('gender', { message }));
  };

  return (
    <View>
      <Text2md
        fontWeight={FontWeightEnum.BOLD}
        extraStyles="text-black-greyscale-main dark:text-black-greyscale-main-dark"
      >
        {i18n.t('settings.personal-info')}
      </Text2md>

      <View className="pt-[5px]">
        <FormTextInput
          name="firstName"
          label={i18n.t('personal-info.first-name')}
          placeholder={i18n.t('personal-info.first-name-placeholder')}
          control={control}
        />

        <FormTextInput
          name="lastName"
          label={i18n.t('personal-info.last-name')}
          placeholder={i18n.t('personal-info.last-name-placeholder')}
          control={control}
        />

        <FormDropdownInput
          name="gender"
          label={i18n.t('personal-info.gender')}
          buttonLabel={i18n.t('personal-info.save')}
          placeholder={i18n.t('personal-info.gender-placeholder')}
          title={i18n.t('personal-info.gender-title')}
          options={getGenderDictionary()}
          control={control}
        />

        {showSaveButton && (
          <Button
            label={i18n.t('personal-info.save')}
            type="filled"
            isDisabled={!isValid}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmitPersonalInfo)}
            borderRadius="rounded-lg"
          />
        )}
      </View>
    </View>
  );
};

export default PersonalInfoForm;
