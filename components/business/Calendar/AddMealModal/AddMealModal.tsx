import React from 'react';
import { View } from 'react-native';

import TextInput from '../../../ui/TextInput/TextInput';

import { FontWeightEnum } from '@/common/enums';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';

interface AddMealModalProps {
  isVisible: boolean;
  hideModal: () => void;
  onCreateMeal: (name: string) => void;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ onCreateMeal, isVisible, hideModal }) => {
  const [mealName, setMealName] = React.useState('');

  return (
    <Modal
      isVisible={isVisible}
      onClose={hideModal}
      header={
        <View className="flex flex-row items-center justify-between pb-4">
          <Text2Md fontWeight={FontWeightEnum.BOLD}>Створення прийому їжі</Text2Md>
        </View>
      }
      footer={
        <View className="flex flex-row justify-between mt-6">
          <View className="flex-1 mr-4">
            <Button
              onPress={() => {
                hideModal();
                setMealName('');
              }}
              type="outlined"
              borderRadius="rounded-lg"
              label="Скасувати"
            />
          </View>

          <View className="flex-1">
            <Button
              onPress={() => {
                onCreateMeal(mealName);
                setMealName('');
              }}
              isDisabled={!mealName || mealName.length === 0}
              type="filled"
              borderRadius="rounded-lg"
              label="Створити"
            />
          </View>
        </View>
      }
    >
      <TextInput
        onChangeText={setMealName}
        value={mealName}
        label="Назва трапези"
        placeholder="напр., Сніданок"
      />
    </Modal>
  );
};

export default AddMealModal;
