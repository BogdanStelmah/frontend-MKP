import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { IRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import useModal from '@/common/hooks/useModal';
import { formatUserName, generateIngredientText, formatOfTransfer } from '@/common/utils';
import RecipeSettingsModal from '@/components/business/RecipeOverviewModal/RecipeSettingsModal';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2md from '@/components/ui/Typography/Text2md';
import Text2Sm from '@/components/ui/Typography/Text2sm';
import Text2xs from '@/components/ui/Typography/Text2xs';

interface RecipeOverviewModalProps {
  recipe: IRecipe;
  isModalVisible: boolean;
  hideModal: () => void;
}

const RecipeOverviewModal: React.FC<RecipeOverviewModalProps> = ({
  isModalVisible,
  hideModal,
  recipe
}) => {
  const [isRecipeSettingsModalVisible, showRecipeSettingsModal, hideRecipeSettingsModal] =
    useModal();

  return (
    <>
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

            <View className="flex-row items-center">
              <Button extraStyles="mr-[14px]">
                <Feather name="heart" size={24} color="#454545" />
              </Button>

              <Button onPress={showRecipeSettingsModal}>
                <Entypo name="dots-three-horizontal" size={24} color="#454545" />
              </Button>
            </View>
          </View>
        }
        footer={
          <View className="pt-4">
            <Button label="Додати до розкладу" type="filled" borderRadius="rounded-lg" />
          </View>
        }
      >
        <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={{ height: 196 }}
              source={{ uri: recipe.imageUrl }}
              className="rounded-sm"
            />
          </View>

          <View>
            <Text2md fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="font-extrabold">
              {recipe.title}
            </Text2md>

            {recipe.user && (
              <View className="flex-row">
                <Text2xs fontWeight={FontWeightEnum.MEDIUM}>Від </Text2xs>
                <Text2xs fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-green-secondary-2">
                  {formatUserName(recipe.user)}
                </Text2xs>
              </View>
            )}
          </View>

          <View>
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>ОПИС</Text2Sm>
            <Text2xs fontWeight={FontWeightEnum.REGULAR} extraStyles="text-justify">
              {recipe.description}
            </Text2xs>
          </View>

          <View>
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>ІНГРЕДІЄНТИ</Text2Sm>

            <View className="mt-[1px]">
              {recipe.ingredientToRecipes &&
                recipe.ingredientToRecipes.map((ingredient) => (
                  <Text2xs fontWeight={FontWeightEnum.REGULAR} key={ingredient.id}>
                    {generateIngredientText(ingredient)}
                  </Text2xs>
                ))}
            </View>
          </View>

          <View>
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>КРОКИ ПРИГОТУВАННЯ</Text2Sm>
            <Text2xs fontWeight={FontWeightEnum.REGULAR}>
              {formatOfTransfer(recipe.cookingInstructions)}
            </Text2xs>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>КАЛОРІЙНІСТЬ</Text2Sm>
              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{recipe.calorieContent}</Text2xs>
            </View>
            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>ВАГА ПОРЦІЇ</Text2Sm>
              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{recipe.weight}</Text2xs>
            </View>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>КІЛЬКІСТЬ ПОРЦІЙ</Text2Sm>
              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{recipe.numberOfServings}</Text2xs>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <RecipeSettingsModal
        isModalVisible={isRecipeSettingsModalVisible}
        hideModal={hideRecipeSettingsModal}
      />
    </>
  );
};

export default RecipeOverviewModal;
