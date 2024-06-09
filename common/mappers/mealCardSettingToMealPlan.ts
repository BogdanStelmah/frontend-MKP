import { IMealPlan } from '@/common/entities';
import { MealCardSetting } from '@/common/types';

export const mealCardSettingToMealPlan = (
  mealCardSetting: MealCardSetting
): IMealPlan | Omit<IMealPlan, 'id'> => {
  const {
    id,
    name,
    mealStartTime,
    mealEndTime,
    preparationStartTime,
    preparationEndTime,
    totalNumberOfServings
  } = mealCardSetting;

  const formattedId = Number.isFinite(id) ? +id : undefined;

  return {
    id: formattedId,
    name,
    preparationStartTime: preparationStartTime?.toISOString(),
    preparationEndTime: preparationEndTime?.toISOString(),
    mealStartTime: mealStartTime?.toISOString(),
    mealEndTime: mealEndTime?.toISOString(),
    totalNumberOfServings
  };
};
