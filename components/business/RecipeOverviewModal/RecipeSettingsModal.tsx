import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface RecipeSettingsModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

const RecipeSettingsModal: React.FC<RecipeSettingsModalProps> = ({ isModalVisible, hideModal }) => {
  const recipeOptions = [
    { label: 'Модифікувати', onPress: () => {} },
    { label: 'Переглянути орігінал', onPress: () => {} },
    { label: 'Видалити модифікування', onPress: () => {} },
    { label: 'Ніколи не показувати', onPress: () => {} }
  ];

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      header={
        <View className="flex flex-row items-center mb-4">
          <Button onPress={hideModal} extraStyles="mr-[8px]">
            <AntDesign name="arrowleft" size={24} color="#454545" />
          </Button>
          <Text2Md fontWeight={FontWeightEnum.BOLD}>Налаштування рецепту</Text2Md>
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
