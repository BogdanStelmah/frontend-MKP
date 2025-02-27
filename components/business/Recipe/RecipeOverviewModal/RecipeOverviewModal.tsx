import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

import { IRecipe } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { useModal } from '@/common/hooks/useModal';
import {
  formatUserName,
  generateIngredientText,
  formatOfTransfer,
  formatPFC
} from '@/common/utils';
import RecipeSettingsModal from '@/components/business/Recipe/RecipeOverviewModal/RecipeSettingsModal';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Rating } from '@/components/ui/Rating';
import Text2md from '@/components/ui/Typography/Text2md';
import Text2Sm from '@/components/ui/Typography/Text2sm';
import Text2xs from '@/components/ui/Typography/Text2xs';
import i18n from '@/i18n';

interface RecipeOverviewModalProps {
  recipe: IRecipe;
  isModalVisible: boolean;
  isRemoveFromReschedule?: boolean;
  isFavorite?: boolean;
  isYourRecipe?: boolean;
  isLoading?: boolean;
  hideModal: () => void;
  onPressAddToReschedule: (recipe: IRecipe) => void;
  onPressRemoveFromReschedule?: (recipe: IRecipe) => void;
  onPressAddToFavorites?: (recipe: IRecipe) => void;
  onPressRemoveFromFavorites?: (recipe: IRecipe) => void;
  onPublishRecipe?: (recipeId: number) => void;
}

const RecipeOverviewModal: React.FC<RecipeOverviewModalProps> = ({
  isModalVisible,
  hideModal,
  recipe,
  onPressAddToReschedule,
  isRemoveFromReschedule = false,
  isYourRecipe = false,
  isFavorite = false,
  isLoading = false,
  onPressRemoveFromReschedule,
  onPressAddToFavorites,
  onPressRemoveFromFavorites,
  onPublishRecipe
}) => {
  const { colorScheme } = useColorScheme();
  const [isRecipeSettingsModalVisible, showRecipeSettingsModal, hideRecipeSettingsModal] =
    useModal();

  const handlePublishRecipe = () => {
    hideRecipeSettingsModal();
    onPublishRecipe?.(recipe.id);
  };

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
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                />
              </Button>
            </View>

            {!isRemoveFromReschedule && (
              <View className="flex-row items-center">
                {!isYourRecipe && (
                  <Button extraStyles="mr-[14px]">
                    {!isFavorite ? (
                      <TouchableOpacity onPress={() => onPressAddToFavorites?.(recipe)}>
                        <Feather
                          name="heart"
                          size={24}
                          color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => onPressRemoveFromFavorites?.(recipe)}>
                        <AntDesign
                          name="heart"
                          size={24}
                          color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                        />
                      </TouchableOpacity>
                    )}
                  </Button>
                )}

                <Button onPress={showRecipeSettingsModal}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                  />
                </Button>
              </View>
            )}
          </View>
        }
        footer={
          <View className="pt-4">
            <Button
              label={
                !isRemoveFromReschedule
                  ? i18n.t('recipe-search.modal.add-to-reschedule')
                  : i18n.t('recipe-search.modal.delete-from-schedule')
              }
              type="filled"
              borderRadius="rounded-lg"
              isLoading={isLoading}
              onPress={() =>
                !isRemoveFromReschedule
                  ? onPressAddToReschedule(recipe)
                  : onPressRemoveFromReschedule?.(recipe)
              }
            />
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
            <View className="flex-row justify-between">
              <Text2md fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="font-extrabold">
                {recipe.title}
              </Text2md>

              <View className="top-[5px]">
                <Rating value={recipe.rating?.calculatedRating} />
              </View>
            </View>

            {recipe.user && (
              <View className="flex-row">
                <Text2xs fontWeight={FontWeightEnum.MEDIUM}>
                  {i18n.t('recipe-search.modal.from')}
                </Text2xs>

                <Text2xs
                  fontWeight={FontWeightEnum.MEDIUM}
                  extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark"
                >
                  {formatUserName(recipe.user)}
                </Text2xs>
              </View>
            )}
          </View>

          {recipe?.description && (
            <View>
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('recipe-search.modal.description')}
              </Text2Sm>

              <Text2xs fontWeight={FontWeightEnum.REGULAR} extraStyles="text-justify">
                {recipe?.description}
              </Text2xs>
            </View>
          )}

          <View>
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
              {i18n.t('recipe-search.modal.ingredients')}
            </Text2Sm>

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
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
              {i18n.t('recipe-search.modal.instructions')}
            </Text2Sm>

            <Text2xs fontWeight={FontWeightEnum.REGULAR}>
              {formatOfTransfer(recipe.cookingInstructions)}
            </Text2xs>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('recipe-search.modal.calories')}
              </Text2Sm>

              <Text2xs fontWeight={FontWeightEnum.REGULAR}>
                {recipe.calorieContent}{' '}
                {i18n.t('recipe-search.modal.measurement-units-for-calories')}
              </Text2xs>
            </View>

            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('recipe-search.modal.weight')}
              </Text2Sm>

              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{recipe.weight} г</Text2xs>
            </View>
          </View>

          <View className="flex-row">
            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('recipe-search.modal.number-of-servings')}
              </Text2Sm>

              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{recipe.numberOfServings}</Text2xs>
            </View>

            <View className="flex-1">
              <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('recipe-search.modal.pfc')}
              </Text2Sm>

              <Text2xs fontWeight={FontWeightEnum.REGULAR}>{formatPFC(recipe)}</Text2xs>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <RecipeSettingsModal
        isModalVisible={isRecipeSettingsModalVisible}
        hideModal={hideRecipeSettingsModal}
        isYourRecipe={isYourRecipe}
        isPublicRecipe={recipe.isPublished}
        onPublishRecipe={handlePublishRecipe}
      />
    </>
  );
};

export default RecipeOverviewModal;
