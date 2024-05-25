import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { useModal } from '@/common/hooks';
import { formatIngredient } from '@/common/utils';
import { createRecipeScheme } from '@/common/validations';
import AddIngredientModal, {
  IAddIngredientFormInput
} from '@/components/business/MyRecipes/AddIngredientModal/AddIngredientModal';
import Button from '@/components/ui/Button';
import FormImageInput from '@/components/ui/ImageInput/FormImageInput';
import IngredientItem from '@/components/ui/IngredientItem/IngredientItem';
import Modal from '@/components/ui/Modal';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2Md from '@/components/ui/Typography/Text2md';
import { useRecipeStore } from '@/store';

export interface ICreateRecipeFormInput {
  imageUri: string;
  title: string;
  description?: string;
  cookingInstructions: string;
  ingredients: IAddIngredientFormInput[];
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
  const [ingredientsString, setIngredientsString] = useState<string[]>([]);

  const { colorScheme } = useColorScheme();
  const [isAddIngredientModalVisible, showAddIngredientModal, hideAddIngredientModal] = useModal();

  const createRecipe = useRecipeStore.use.createRecipe();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
    reset
  } = useForm<ICreateRecipeFormInput>({
    mode: 'onChange',
    resolver: yupResolver(createRecipeScheme),
    defaultValues: {
      ingredients: []
    }
  });

  const ingredientsWatcher = watch('ingredients');

  useEffect(() => {
    if (ingredientsWatcher) {
      const formattedIngredients = ingredientsWatcher.map(formatIngredient);
      setIngredientsString(formattedIngredients);
    }
  }, [ingredientsWatcher]);

  const onSubmit: SubmitHandler<ICreateRecipeFormInput> = async (data) => {
    await createRecipe(data);
  };

  const handleAddIngredient = (data: IAddIngredientFormInput) => {
    setValue('ingredients', [...getValues('ingredients'), data]);
  };

  const handleHideModal = () => {
    hideModal();
    reset();
  };

  const handleDeleteIngredient = (index: number) => {
    const ingredients = getValues('ingredients');

    ingredients.splice(index, 1);
    setValue('ingredients', ingredients);
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
            <IngredientItem
              ingredientsString={ingredientsString}
              handleDeleteIngredient={handleDeleteIngredient}
            />

            <View className="pt-4">
              <Button
                label="Додати інгредієнт"
                type="outlined"
                borderRadius="rounded-lg"
                onPress={showAddIngredientModal}
              />
            </View>
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

      <AddIngredientModal
        isModalVisible={isAddIngredientModalVisible}
        hideModal={hideAddIngredientModal}
        onAddIngredient={handleAddIngredient}
      />
    </>
  );
};

export default CreateRecipeModal;
