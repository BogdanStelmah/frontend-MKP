import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { genderDictionary } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { GenderOption } from '@/common/types';
import { partnerPersonalDetails } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormDropdownInput from '@/components/ui/DropdownInput/FormDropdownInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle/TabTitle';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';
import { useUserStore } from '@/store';

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderOption;
}

const Settings = () => {
  const logout = useUserStore.use.logout();

  const { control } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(partnerPersonalDetails)
  });

  const onLogout = () => {
    logout();
    router.push('/introduction');
  };

  return (
    <ScreenContainer>
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <TabTitle title={i18n.t('settings.tab-title')} extraTitleStyles="w-[250px]" />

        <View className="pt-[19px] space-y-[20px]">
          <View>
            <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main">
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
                options={genderDictionary}
                control={control}
              />
            </View>
          </View>

          <View>
            <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main">
              {i18n.t('settings.personalize-your-app')}
            </Text2md>

            <View className="pt-[5px]">
              <FormTextInput
                name="firstName"
                label={i18n.t('settings.language')}
                placeholder={i18n.t('settings.language-placeholder')}
                control={control}
              />

              <FormTextInput
                name="lastName"
                label={i18n.t('settings.theme')}
                placeholder={i18n.t('settings.theme-placeholder')}
                control={control}
              />
            </View>
          </View>

          <View>
            <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main">
              {i18n.t('settings.notifications')}
            </Text2md>
          </View>

          <View className="pt-6">
            <Button
              label={i18n.t('settings.log-out-of-your-account')}
              type="outlined"
              borderRadius="rounded-lg"
              onPress={onLogout}
            />
            <Button
              label={i18n.t('settings.delete-account')}
              type="outlined"
              borderRadius="rounded-lg"
              extraStyles="my-4"
              isWarning
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default Settings;
