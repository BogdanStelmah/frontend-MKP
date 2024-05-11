import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import DeleteAccountModal from '../../../components/business/Setting/DeleteAccountModal/DeleteAccountModal';

import { useModal } from '@/common/hooks';
import { AppPersonalizationForm, PersonalInfoForm } from '@/components/business/Setting';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle/TabTitle';
import i18n from '@/i18n';
import { userApi } from '@/service';
import { useUserStore } from '@/store';

const Settings = () => {
  const [isDeleteAccountModalVisible, showDeleteAccountModal, hideDeleteAccountModal] = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const logout = useUserStore.use.logout();

  const onLogout = () => {
    logout();
    router.push('/introduction');
  };

  const onSubmitDeleteAccount = async () => {
    setIsLoading(true);

    await userApi.deleteUser();
    onLogout();

    setIsLoading(false);
  };

  return (
    <ScreenContainer>
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <TabTitle title={i18n.t('settings.tab-title')} extraTitleStyles="w-[250px]" />

        <View className="pt-[19px] space-y-[20px]" onStartShouldSetResponder={() => true}>
          <View>
            <PersonalInfoForm />
          </View>

          <View>
            <AppPersonalizationForm />
          </View>

          {/* TODO: Implement this feature */}
          {/*<View>*/}
          {/*  <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main dark:text--black-greyscale-main-dark">*/}
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
              isLoading={isLoading}
              onPress={showDeleteAccountModal}
            />
          </View>
        </View>
      </ScrollView>

      <DeleteAccountModal
        isVisible={isDeleteAccountModalVisible}
        hideModal={hideDeleteAccountModal}
        onSubmit={onSubmitDeleteAccount}
      />
    </ScreenContainer>
  );
};

export default Settings;
