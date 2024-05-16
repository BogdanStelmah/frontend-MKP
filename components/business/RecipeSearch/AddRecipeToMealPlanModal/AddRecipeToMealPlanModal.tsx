import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, View } from 'react-native';

import CalendarForCurrentWeek from '../../Calendar/CalendarForCurrentWeek';

import { FontWeightEnum } from '@/common/enums';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import { usePlanStore } from '@/store/planStore';

interface AddRecipeToMealPlanModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  recipeId: number;
}

const AddRecipeToMealPlanModal: React.FC<AddRecipeToMealPlanModalProps> = ({
  isModalVisible,
  hideModal,
  recipeId
}) => {
  const { colorScheme } = useColorScheme();
  const addRecipeToMealPlan = usePlanStore.use.addRecipeToMealPlan();

  const handleAddToReschedule = (mealPlanId: number) => {
    addRecipeToMealPlan(recipeId, mealPlanId).catch((e) => console.error(e));
    hideModal();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      isFullHeight
      extraStyles="pt-0"
      header={
        <View className="flex-row items-center justify-between mb-[19px]">
          <View>
            <Button onPress={hideModal}>
              <AntDesign
                name="arrowleft"
                size={24}
                color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
              />
            </Button>
          </View>

          <View className="w-[250px]">
            <Text2Md fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="text-center">
              Оберіть день для додавання рецепту до плану харчування
            </Text2Md>
          </View>

          <View className="w-[10px]" />
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
        <CalendarForCurrentWeek
          isAddRecipeToMealPlan
          onPressAddToReschedule={handleAddToReschedule}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddRecipeToMealPlanModal;
