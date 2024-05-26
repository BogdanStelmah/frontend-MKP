import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { getGeneralOptions } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { useModal } from '@/common/hooks';
import { formatIngredient } from '@/common/utils';
import { createRecipeScheme } from '@/common/validations';
import AddIngredientModal, {
  IAddIngredientFormInput
} from '@/components/business/MyRecipes/AddIngredientModal/AddIngredientModal';
import Button from '@/components/ui/Button';
import FormCheckboxGroup from '@/components/ui/CheckboxGroup/FormCheckboxGroup';
import FormImageInput from '@/components/ui/ImageInput/FormImageInput';
import IngredientItem from '@/components/ui/IngredientItem/IngredientItem';
import Modal from '@/components/ui/Modal';
import FormNumberInput from '@/components/ui/NumberInput/FormTimeInput';
import { FormTextInput } from '@/components/ui/TextInput';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';
import i18n from '@/i18n';
import { useRecipeStore } from '@/store';

export interface ICreateRecipeFormInput {
  imageUri: string;
  title: string;
  description?: string;
  cookingInstructions: string;
  ingredients: IAddIngredientFormInput[];
  calorieContent: number;
  weight: number;
  numberOfServings: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  cookingTime: number;
  categoryIds: number[];
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
    createRecipe(data).then(() => {
      handleHideModal();
    });
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
              <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('my-recipes.create-recipe.title')}
              </Text2Md>
            </View>
          </View>
        }
        footer={
          <View className="pt-4">
            <Button
              label={i18n.t('personal-info.save')}
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
              label={i18n.t('my-recipes.create-recipe.name')}
              placeholder={i18n.t('my-recipes.create-recipe.name-placeholder')}
            />
          </View>

          <View>
            <FormTextInput
              name="description"
              control={control}
              label={i18n.t('my-recipes.create-recipe.description')}
              placeholder={i18n.t('my-recipes.create-recipe.description-placeholder')}
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
                label={i18n.t('general.add-ingredient')}
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
              label={i18n.t('my-recipes.create-recipe.cookingInstructions')}
              placeholder={i18n.t('my-recipes.create-recipe.cookingInstructions-placeholder')}
              isMultiline
            />
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.cookingTime')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="cookingTime" control={control} />
                </View>

                <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-center ml-2">
                  {i18n.t('my-recipes.create-recipe.cookingTime-placeholder')}
                </Text2sm>
              </View>
            </View>

            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.weight')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="weight" control={control} />
                </View>

                <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-center ml-2">
                  {i18n.t('my-recipes.create-recipe.weight-placeholder')}
                </Text2sm>
              </View>
            </View>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.calorieContent')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="calorieContent" control={control} />
                </View>

                <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-center ml-2">
                  {i18n.t('my-recipes.create-recipe.calorieContent-placeholder')}
                </Text2sm>
              </View>
            </View>

            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.numberOfServings')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="numberOfServings" control={control} />
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.protein')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="protein" control={control} />
                </View>
              </View>
            </View>

            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.fat')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="fat" control={control} />
                </View>
              </View>
            </View>

            <View className="flex-1">
              <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
                {i18n.t('my-recipes.create-recipe.carbohydrates')}
              </Text2sm>

              <View className="flex-row items-center mt-[2px]">
                <View className="w-[60px]">
                  <FormNumberInput name="carbohydrates" control={control} />
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mb-[8px]">
              {i18n.t('my-recipes.create-recipe.choose-category')}
            </Text2sm>

            <FormCheckboxGroup
              name="categoryIds"
              control={control}
              options={getGeneralOptions()}
              extraStylesRadioButton="mb-1"
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
