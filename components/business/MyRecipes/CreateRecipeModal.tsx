import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { createRecipeScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormImageInput from '@/components/ui/ImageInput/FormImageInput';
import Modal from '@/components/ui/Modal';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2Md from '@/components/ui/Typography/Text2md';

interface IFormInput {
  imageUri: string;
  title: string;
  description?: string;
  cookingInstructions: string;
  // calorieContent: number;
  // weight: number;
  // numberOfServings: number;
  // protein?: number;
  // fat?: number;
  // carbohydrates?: number;
  // cookingTime: number;
}

interface CreateRecipeModalModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

const CreateRecipeModal: React.FC<CreateRecipeModalModalProps> = ({
  isModalVisible,
  hideModal
}) => {
  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
    reset
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(createRecipeScheme)
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  const handleHideModal = () => {
    hideModal();
    reset();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onClose={handleHideModal}
        isFullHeight
        extraStyles="pt-0"
        header={
          <View className="flex-row items-center justify-between h-[32px] mb-[20px]">
            <View>
              <Button onPress={handleHideModal}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                />
              </Button>
            </View>

            <View className="w-full items-center absolute">
              <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>Створення нового рецепту</Text2Md>
            </View>
          </View>
        }
        footer={
          <View className="pt-4">
            <Button
              label="Зберегти"
              type="filled"
              borderRadius="rounded-lg"
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid}
            />
          </View>
        }
      >
        <ScrollView className="flex-col gap-y-[15px]" showsVerticalScrollIndicator={false}>
          <View>
            <FormImageInput name="imageUri" control={control} />
          </View>

          <View>
            <FormTextInput
              name="title"
              control={control}
              label="Назва"
              placeholder="напр., Курка-гриль"
            />
          </View>

          <View>
            <FormTextInput
              name="description"
              control={control}
              label="Опис (необов'язково)"
              placeholder="Додати короткий опис"
              isMultiline
            />
          </View>

          <View>
            <FormTextInput
              name="cookingInstructions"
              control={control}
              label="Як приготувати"
              placeholder={`Додати інструкцію\n1. ...\n2. ...`}
              isMultiline
            />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
