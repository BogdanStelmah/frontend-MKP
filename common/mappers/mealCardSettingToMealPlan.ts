import { IMealPlan } from '@/common/entities';
import { MealCardSetting } from '@/common/types';

export const mealCardSettingToMealPlan = (mealCardSetting: MealCardSetting): IMealPlan => {
  const {
    id,
    name,
    mealStartTime,
    mealEndTime,
    preparationStartTime,
    preparationEndTime,
    totalNumberOfServings
  } = mealCardSetting;

  return {
    id,
    name,
    preparationStartTime: preparationStartTime?.toISOString(),
    preparationEndTime: preparationEndTime?.toISOString(),
    mealStartTime: mealStartTime?.toISOString(),
    mealEndTime: mealEndTime?.toISOString(),
    totalNumberOfServings
  };
};
