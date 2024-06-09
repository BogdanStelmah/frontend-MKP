import { IMealPlan } from '@/common/entities';
import { MealCardSetting } from '@/common/types';

export const mealPlanToMealCardSetting = (mealPlan: IMealPlan): MealCardSetting => {
  const {
    totalNumberOfServings,
    preparationEndTime,
    preparationStartTime,
    mealStartTime,
    mealEndTime,
    id,
    name
  } = mealPlan;

  return {
    id,
    name,
    preparationStartTime: preparationStartTime ? new Date(preparationStartTime) : null,
    preparationEndTime: preparationEndTime ? new Date(preparationEndTime) : null,
    mealStartTime: mealStartTime ? new Date(mealStartTime) : null,
    mealEndTime: mealEndTime ? new Date(mealEndTime) : null,
    totalNumberOfServings
  };
};
