import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';
import i18n from '@/i18n';

interface RecipeSettingsModalProps {
  isModalVisible: boolean;
  isYourRecipe?: boolean;
  isPublicRecipe?: boolean;
  hideModal: () => void;
  onPublishRecipe?: () => void;
}

const RecipeSettingsModal: React.FC<RecipeSettingsModalProps> = ({
  isModalVisible,
  isYourRecipe = false,
  isPublicRecipe = false,
  onPublishRecipe,
  hideModal
}) => {
  const { colorScheme } = useColorScheme();

  const recipeOptions = !isYourRecipe
    ? [
        { label: i18n.t('recipe-search.setting-up-a-recipe.modify'), onPress: () => {} },
        { label: i18n.t('recipe-search.setting-up-a-recipe.view-original'), onPress: () => {} },
        {
          label: i18n.t('recipe-search.setting-up-a-recipe.remove-modifications'),
          onPress: () => {}
        },
        { label: i18n.t('recipe-search.setting-up-a-recipe.never-show'), onPress: () => {} }
      ]
    : [
        { label: 'Видалити рецепт', onPress: () => {} },
        !isPublicRecipe
          ? { label: 'Опублікувати рецепт', onPress: onPublishRecipe }
          : { label: 'Приховати рецепт', onPress: () => {} }
      ];

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      header={
        <View className="flex flex-row items-center mb-4">
          <Button onPress={hideModal} extraStyles="mr-[8px]">
            <AntDesign
              name="arrowleft"
              size={24}
              color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
            />
          </Button>

          <Text2Md fontWeight={FontWeightEnum.BOLD}>
            {i18n.t('recipe-search.setting-up-a-recipe.title')}
          </Text2Md>
        </View>
      }
    >
      {recipeOptions.map((option) => (
        <Button extraStyles="py-[10px] items-start" key={option.label} onPress={option.onPress}>
          <Text2sm fontWeight={FontWeightEnum.MEDIUM}>{option.label}</Text2sm>
        </Button>
      ))}
    </Modal>
  );
};

export default RecipeSettingsModal;
