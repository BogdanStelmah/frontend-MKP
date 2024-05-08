import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppPersonalizationForm, PersonalInfoForm } from '@/components/business/Setting';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle/TabTitle';
import i18n from '@/i18n';
import { useUserStore } from '@/store';

const Settings = () => {
  const logout = useUserStore.use.logout();

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
            <PersonalInfoForm />
          </View>

          <View>
            <AppPersonalizationForm />
          </View>

          {/* TODO: Implement this feature */}
          {/*<View>*/}
          {/*  <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main">*/}
          {/*    {i18n.t('settings.notifications')}*/}
          {/*  </Text2md>*/}
          {/*</View>*/}

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
