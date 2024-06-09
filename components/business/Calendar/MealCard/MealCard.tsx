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
import i18n from '@/i18n';

interface MealCardProps {
  mealPlan: MealCardSetting;
  onChange: (settings: MealCardSetting) => void;
  onDelete: (mealCardId: number | string) => void;
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
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('calendar.plan.meal-plan.allocated-cooking-time')}
          </Text2sm>

          <View className="flex-row items-center mt-[2px]">
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mr-[10px]">
              {i18n.t('calendar.plan.meal-plan.from')}
            </Text2sm>

            <TimeInput
              value={mealPlan.preparationStartTime}
              onChange={(value) => onChange({ ...mealPlan, preparationStartTime: value })}
            />

            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mx-[10px]">
              {i18n.t('calendar.plan.meal-plan.to')}
            </Text2sm>

            <TimeInput
              value={mealPlan.preparationEndTime}
              onChange={(value) => onChange({ ...mealPlan, preparationEndTime: value })}
            />
          </View>
        </View>

        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('calendar.plan.meal-plan.meal-time')}
          </Text2sm>

          <View className="flex-row items-center mt-[2px]">
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mr-[10px]">
              {i18n.t('calendar.plan.meal-plan.from')}
            </Text2sm>

            <TimeInput
              value={mealPlan.mealStartTime}
              onChange={(value) => onChange({ ...mealPlan, mealStartTime: value })}
            />

            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mx-[10px]">
              {i18n.t('calendar.plan.meal-plan.to')}
            </Text2sm>

            <TimeInput
              value={mealPlan.mealEndTime}
              onChange={(value) => onChange({ ...mealPlan, mealEndTime: value })}
            />
          </View>
        </View>

        <View className="flex-row items-center mt-[2px]">
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>
            {i18n.t('calendar.plan.meal-plan.number-of-servings')}
          </Text2sm>

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
