import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  CalorieContentOptions,
  cookingTimeOptions,
  defaultRecipeFilters,
  generalOptions,
  recipeAuthors,
  TagsOptions
} from '@/common/dictionary';
import { FontWeightEnum, UsersTypeEnum } from '@/common/enums';
import { RecipeFiltersType } from '@/common/types';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import { RadioGroup } from '@/components/ui/RadioGroup';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2Xs from '@/components/ui/Typography/Text2xs';
import i18n from '@/i18n';

interface RecipeFiltersModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  selectedFilters: RecipeFiltersType;
  setSelectedFilters: (filters: RecipeFiltersType) => void;
  selectedFiltersCount?: number;
}

const RecipeFiltersModal: React.FC<RecipeFiltersModalProps> = ({
  isModalVisible,
  hideModal,
  setSelectedFilters,
  selectedFilters,
  selectedFiltersCount = 0
}) => {
  const setSelectedOption = (newFilters: Partial<RecipeFiltersType>) => {
    setSelectedFilters({
      ...selectedFilters,
      ...newFilters
    });
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      isFullHeight
      extraStyles="pt-0"
      header={
        <View className="flex-row items-center justify-between h-[32px] mb-[14px]">
          <View>
            <Button onPress={hideModal}>
              <AntDesign name="arrowleft" size={24} color="#454545" />
            </Button>
          </View>

          <View className="w-full items-center absolute">
            <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
              {i18n.t('recipe-search.filters.title')}{' '}
              {selectedFiltersCount > 0 && `(${selectedFiltersCount})`}
            </Text2Md>
          </View>

          <View>
            <Button onPress={() => setSelectedOption({ ...defaultRecipeFilters })}>
              <Text2Xs fontWeight={FontWeightEnum.SEMIBOLD}>Очистити</Text2Xs>
            </Button>
          </View>
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[12px]" showsVerticalScrollIndicator={false}>
        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('recipe-search.filters.general')}
          </Text2Md>

          <RadioGroup
            options={generalOptions}
            value={selectedFilters.general}
            onSelect={(option) => setSelectedOption({ general: option })}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('recipe-search.filters.cooking-time')}
          </Text2Md>

          <RadioGroup
            options={cookingTimeOptions}
            value={selectedFilters.cookingTime}
            onSelect={(option) => setSelectedOption({ cookingTime: option })}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('recipe-search.filters.calories')}
          </Text2Md>

          <RadioGroup
            options={CalorieContentOptions}
            value={selectedFilters.calories}
            onSelect={(option) => setSelectedOption({ calories: option })}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('recipe-search.filters.tags')}
          </Text2Md>

          <RadioGroup
            options={TagsOptions}
            value={selectedFilters.tags}
            onSelect={(option) => setSelectedOption({ tags: option })}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('recipe-search.filters.recipes')}
          </Text2Md>

          <CheckboxGroup
            options={recipeAuthors}
            selectedValues={selectedFilters.recipeAuthors}
            onChange={(options) => setSelectedOption({ recipeAuthors: options as UsersTypeEnum[] })}
            extraStylesRadioButton="mb-1"
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default RecipeFiltersModal;
