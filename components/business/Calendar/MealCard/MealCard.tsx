import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import NumberInput from '../../../ui/NumberInput/NumberInput';
import TimeInput from '../../../ui/TimeInput/TimeInput';

import { FontWeightEnum } from '@/common/enums';
import { MealCardSetting } from '@/common/types';
import Text2md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface MealCardProps {
  mealPlan: MealCardSetting;
  onChange: (settings: MealCardSetting) => void;
  onDelete: (mealCardId: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ mealPlan, onChange, onDelete }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="p-[5px] bg-chosen rounded-lg">
      <View className="flex-row items-center justify-between mb-[10px]">
        <Text2md fontWeight={FontWeightEnum.BOLD}>{mealPlan.name}</Text2md>
        <TouchableOpacity onPress={() => onDelete(mealPlan.id)}>
          <Ionicons
            name="close"
            size={24}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>
      </View>

      <View className="flex gap-y-[20px]">
        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Виділений час для приготування:</Text2sm>

          <View className="flex-row items-center mt-[2px]">
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mr-[10px]">
              від
            </Text2sm>

            <TimeInput
              value={mealPlan.preparationStartTime}
              onChange={(value) => onChange({ ...mealPlan, preparationStartTime: value })}
            />

            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mx-[10px]">
              до
            </Text2sm>

            <TimeInput
              value={mealPlan.preparationEndTime}
              onChange={(value) => onChange({ ...mealPlan, preparationEndTime: value })}
            />
          </View>
        </View>

        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Час трапези:</Text2sm>

          <View className="flex-row items-center mt-[2px]">
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mr-[10px]">
              від
            </Text2sm>

            <TimeInput
              value={mealPlan.mealStartTime}
              onChange={(value) => onChange({ ...mealPlan, mealStartTime: value })}
            />

            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mx-[10px]">
              до
            </Text2sm>

            <TimeInput
              value={mealPlan.mealEndTime}
              onChange={(value) => onChange({ ...mealPlan, mealEndTime: value })}
            />
          </View>
        </View>

        <View className="flex-row items-center mt-[2px]">
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Кількість порцій:</Text2sm>

          <View className="ml-[10px]">
            <NumberInput
              value={mealPlan.totalNumberOfServings}
              onChangeText={(value) => onChange({ ...mealPlan, totalNumberOfServings: +value })}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MealCard;
