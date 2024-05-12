import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import MealPlanSkeleton from '../../../ui/Skeletons/MealPlanSkeleton';

import { IPlan } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums';
import { formatDayNumber } from '@/common/utils';
import { formatDayName } from '@/common/utils/formatDayName';
import { formatShortMonthName } from '@/common/utils/formatShortMonthName';
import { formatTime } from '@/common/utils/formatTime';
import TextMd from '@/components/ui/Typography/TextMd';
import TextSm from '@/components/ui/Typography/TextSm';

interface PlanningDayProps {
  date: Date;
  plan?: IPlan;
  isLoading?: boolean;
  onPressOnSettings: (date: Date) => void;
}

const PlanningDay: React.FC<PlanningDayProps> = ({ date, onPressOnSettings, plan, isLoading }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-col">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="bg-green-secondary-2 dark:bg-green-secondary-2-dark rounded-[10px] px-[5px] pt-[2px] pb-[3px] items-center mr-[5px]">
            <TextSm
              fontWeight={FontWeightEnum.SEMIBOLD}
              extraStyles="text-background dark:text-background-dark"
            >
              {formatDayNumber(date)}
            </TextSm>
            <TextSm
              fontWeight={FontWeightEnum.SEMIBOLD}
              extraStyles="text-background dark:text-background-dark"
            >
              {formatShortMonthName(date)}
            </TextSm>
          </View>

          <View>
            <TextMd fontWeight={FontWeightEnum.SEMIBOLD}>{formatDayName(date)}</TextMd>
          </View>
        </View>

        <View className="flex-row items-center">
          {plan && (
            <TouchableOpacity className="mr-2">
              <AntDesign
                name="exclamationcircleo"
                size={20}
                color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => onPressOnSettings(date)}>
            <Feather
              name="settings"
              size={26}
              color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && <MealPlanSkeleton />}

      {!isLoading && !!plan?.mealPlan?.length && (
        <View className="flex-col mt-1">
          {plan.mealPlan.map((mealPlan) => (
            <View className="ml-[15px]" key={plan.id + '_' + mealPlan.id}>
              <View className="flex-row">
                <TextSm fontWeight={FontWeightEnum.SEMIBOLD}>{mealPlan.name}</TextSm>

                {mealPlan.mealStartTime && (
                  <TextSm
                    fontWeight={FontWeightEnum.SEMIBOLD}
                    extraStyles="text-disable dark:text-disable-dark ml-2"
                  >
                    {formatTime(new Date(mealPlan.mealStartTime))}
                  </TextSm>
                )}

                <View className="ml-1">
                  <Entypo
                    name="plus"
                    size={22}
                    color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PlanningDay;
