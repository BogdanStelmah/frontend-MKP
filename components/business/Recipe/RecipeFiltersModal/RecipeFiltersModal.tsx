import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  CalorieContentOptions,
  cookingTimeOptions,
  generalOptions,
  ingredientAmountsOptions,
  recipeAuthors
} from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import { TypeOption } from '@/common/types';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import { RadioGroup } from '@/components/ui/RadioGroup';
import Text2Md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';

interface RecipeFiltersModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

const RecipeFiltersModal: React.FC<RecipeFiltersModalProps> = ({ isModalVisible, hideModal }) => {
  const [selectedGeneralOption, setSelectedGeneralOption] = useState<TypeOption | undefined>();
  const [amountOfFilters, setAmountOfFilters] = useState<number>(0);

  const [selectedRecipeAuthors, setRecipeAuthor] = React.useState<string[]>([]);

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
              {amountOfFilters > 0 && `(${amountOfFilters})`}
            </Text2Md>
          </View>
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[12px]" showsVerticalScrollIndicator={false}>
        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Загальні</Text2Md>

          <RadioGroup
            options={generalOptions}
            value={selectedGeneralOption}
            onSelect={setSelectedGeneralOption}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Кількість інгредієнтів</Text2Md>

          <RadioGroup
            options={ingredientAmountsOptions}
            value={selectedGeneralOption}
            onSelect={setSelectedGeneralOption}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Час приготування</Text2Md>

          <RadioGroup
            options={cookingTimeOptions}
            value={selectedGeneralOption}
            onSelect={setSelectedGeneralOption}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Калорійність</Text2Md>

          <RadioGroup
            options={CalorieContentOptions}
            value={selectedGeneralOption}
            onSelect={setSelectedGeneralOption}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Теги</Text2Md>

          <RadioGroup
            options={CalorieContentOptions}
            value={selectedGeneralOption}
            onSelect={setSelectedGeneralOption}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Рецепти</Text2Md>

          <CheckboxGroup
            options={recipeAuthors}
            selectedValues={selectedRecipeAuthors}
            onChange={setRecipeAuthor}
            extraStylesRadioButton="mb-1"
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default RecipeFiltersModal;
