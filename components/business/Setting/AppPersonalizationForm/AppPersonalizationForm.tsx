import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { langDictionary, getThemeDictionary } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import { LangOption, ThemeOption } from '@/common/types';
import { changeAppPersonalization } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormDropdownInput from '@/components/ui/DropdownInput/FormDropdownInput';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';
import { useUserStore } from '@/store';

interface IFormInput {
  theme: ThemeOption;
  language: LangOption;
}

const AppPersonalizationForm = () => {
  const [showSaveButton, setShowSaveButton] = useState(false);

  const isLoading = useUserStore.use.isLoading();
  const me = useUserStore.use.me();

  const updateSetting = useUserStore.use.updateSettings();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
    watch,
    setValue
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(changeAppPersonalization)
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (me) {
      const { theme, language } = me.setting;
      const themeOption = getThemeDictionary().find((themeD) => themeD.value === theme);
      if (themeOption) setValue('theme', themeOption);

      const languageOption = langDictionary.find((langD) => langD.value === language);
      if (languageOption) setValue('language', languageOption);
    }
  }, [me]);

  useEffect(() => {
    if (isLoading) return;

    if (
      watchAllFields?.theme?.value !== me?.setting?.theme ||
      watchAllFields?.language?.value !== me?.setting?.language
    ) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [watchAllFields]);

  const onSubmit: SubmitHandler<IFormInput> = async ({ theme, language }) => {
    updateSetting({ theme: theme.value, language: language.value })
      .then(() => {
        setShowSaveButton(false);
      })
      .catch((message) => setError('language', { message }));
  };

  return (
    <View>
      <Text2md fontWeight={FontWeightEnum.BOLD} extraStyles="text-black-greyscale-main">
        {i18n.t('settings.personalize-your-app')}
      </Text2md>

      <View className="pt-[5px]">
        <FormDropdownInput
          name="language"
          label={i18n.t('settings.language')}
          buttonLabel={i18n.t('personal-info.save')}
          placeholder={i18n.t('settings.language-placeholder')}
          title={i18n.t('settings.language')}
          options={langDictionary}
          control={control}
        />

        <FormDropdownInput
          name="theme"
          label={i18n.t('settings.theme')}
          placeholder={i18n.t('settings.theme-placeholder')}
          buttonLabel={i18n.t('personal-info.save')}
          title={i18n.t('settings.theme')}
          options={getThemeDictionary()}
          control={control}
        />

        {showSaveButton && (
          <Button
            label={i18n.t('personal-info.save')}
            type="filled"
            isDisabled={!isValid}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            borderRadius="rounded-lg"
          />
        )}
      </View>
    </View>
  );
};

export default AppPersonalizationForm;
