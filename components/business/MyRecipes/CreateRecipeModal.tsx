import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { createRecipeScheme } from '@/common/validations';
import Button from '@/components/ui/Button';
import FormImageInput from '@/components/ui/ImageInput/FormImageInput';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';

interface IFormInput {
  imageUri: string;
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
          <View className="flex-row items-center justify-between h-[32px] mb-[25px]">
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
              onPress={() => {}}
              isDisabled={!isValid}
            />
          </View>
        }
      >
        <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
          <FormImageInput name="imageUri" control={control} />
        </ScrollView>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
