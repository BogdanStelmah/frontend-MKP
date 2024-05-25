import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { addIngredientScheme } from '@/common/validations';
import { FormAutoCompleteInput } from '@/components/ui/AutoCompleteInput';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2Md from '@/components/ui/Typography/Text2md';

export interface IAddIngredientFormInput {
  nameIngredient: string;
  quantity?: number;
  unitOfMeasure: string;
  comment?: string;
}

interface AddIngredientModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  onAddIngredient: (data: IAddIngredientFormInput) => void;
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
  isModalVisible,
  hideModal,
  onAddIngredient
}) => {
  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<IAddIngredientFormInput>({
    mode: 'onSubmit',
    resolver: yupResolver(addIngredientScheme)
  });

  const onSubmit: SubmitHandler<IAddIngredientFormInput> = async (data) => {
    onAddIngredient(data);
    hideModal();
  };

  const handleHideModal = () => {
    hideModal();
    reset();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={handleHideModal}
      isFullHeight
      extraStyles="pt-0"
      header={
        <View className="flex-row items-center justify-between mb-[19px]">
          <View>
            <Button onPress={handleHideModal}>
              <AntDesign
                name="arrowleft"
                size={24}
                color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
              />
            </Button>
          </View>

          <View className="w-[200px]">
            <Text2Md fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="text-center">
              Додати інгредієнт
            </Text2Md>
          </View>

          <View className="w-[10px]" />
        </View>
      }
      footer={
        <View className="pt-4">
          <Button
            label="Додати"
            type="filled"
            borderRadius="rounded-lg"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid}
          />
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
        <View>
          <FormAutoCompleteInput
            suggestions={['Картопля']}
            name="nameIngredient"
            control={control}
            label="Назва інгредієнту"
            placeholder="напр., Картопля"
          />
        </View>

        <View>
          <FormTextInput
            name="quantity"
            control={control}
            label="Кількість (необов'язково)"
            placeholder="напр., 2.5"
            keyboardType="numeric"
          />
        </View>

        <View>
          <FormAutoCompleteInput
            suggestions={['кг']}
            name="unitOfMeasure"
            control={control}
            label="Одиниця виміру"
            placeholder="напр., кг"
          />
        </View>

        <View>
          <FormTextInput
            name="comment"
            control={control}
            label="Коментар (необов'язково)"
            placeholder="напр., Середня"
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddIngredientModal;
