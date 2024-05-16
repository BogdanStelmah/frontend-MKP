import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import DaySettingsModal, { SaveMealSettingsData } from './DaySettingsModal/DaySettingsModal';

import { useModal } from '@/common/hooks';
import { mealCardSettingToMealPlan } from '@/common/mappers';
import { compareDatesWithoutTime, getDatesOfCurrentWeek } from '@/common/utils';
import { PlanningDay } from '@/components/business/Calendar/PlanningDay';
import { usePlanStore } from '@/store/planStore';

interface CalendarForCurrentWeekProps {
  selectedDate?: Date;
  isAddRecipeToMealPlan?: boolean;
  onPressAddToReschedule?: (mealPlanId: number) => void;
}

const CalendarForCurrentWeek: React.FC<CalendarForCurrentWeekProps> = ({
  selectedDate,
  isAddRecipeToMealPlan = false,
  onPressAddToReschedule
}) => {
  const [selectedWeekDay, setSelectedWeekDay] = useState<Date | null>(null);
  const [isModalVisible, showModal, hideModal] = useModal();

  const plansForCurrentWeek = usePlanStore.use.plansForCurrentWeek();
  const planBySelectedDate = usePlanStore.use.planBySelectedDate();
  const isLoading = usePlanStore.use.isLoading();

  const fetchPlansForCurrentWeek = usePlanStore.use.fetchPlansForCurrentWeek();
  const fetchPlanByDate = usePlanStore.use.fetchPlanByDate();

  const createPlanWithMealPlans = usePlanStore.use.createPlanWithMealPlans();
  const updatePlanWithMealPlans = usePlanStore.use.updatePlanWithMealPlans();

  useEffect(() => {
    if (selectedDate) {
      fetchPlanByDate(selectedDate).catch((err) => console.error(err));
    } else {
      fetchPlansForCurrentWeek().catch((err) => console.error(err));
    }
  }, []);

  const getPlanForDay = useCallback(
    (date: Date) => plansForCurrentWeek.find((plan) => compareDatesWithoutTime(plan.date, date)),
    [plansForCurrentWeek]
  );

  const handlePressOnSettings = (date: Date) => {
    setSelectedWeekDay(date);
    showModal();
  };

  const handleSaveDaySettings = async ({
    date,
    mealPlans,
    planId,
    deletedMealCardIds,
    deletedCategoryIds,
    categoryIds
  }: SaveMealSettingsData) => {
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    const formattedMealPlans = mealPlans.map((mealPlan) => mealCardSettingToMealPlan(mealPlan));

    if (!planId) {
      return await createPlanWithMealPlans(formattedDate, formattedMealPlans, categoryIds);
    }

    await updatePlanWithMealPlans({
      planId,
      categoryIds,
      deletedCategoryIds,
      deletedMealCardIds,
      date: formattedDate,
      mealPlans: formattedMealPlans
    });
  };

  const getPlansForCurrentWeek = () => {
    return getDatesOfCurrentWeek().map((date) => {
      const plan = getPlanForDay(date);

      if (isAddRecipeToMealPlan && !plan?.mealPlan?.length) return null;

      return (
        <View key={date.toString()}>
          <PlanningDay
            date={date}
            onPressOnSettings={handlePressOnSettings}
            plan={getPlanForDay(date)}
            isLoading={isLoading}
            isAddRecipeToMealPlan={isAddRecipeToMealPlan}
            onPressAddToReschedule={onPressAddToReschedule}
          />
        </View>
      );
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-[220px]">
        <View className="flex-col gap-y-[20px]" onStartShouldSetResponder={() => true}>
          {!selectedDate ? (
            getPlansForCurrentWeek()
          ) : (
            <View key={selectedDate.toString()}>
              <PlanningDay
                date={selectedDate}
                onPressOnSettings={handlePressOnSettings}
                plan={planBySelectedDate}
                isLoading={isLoading}
                onPressAddToReschedule={onPressAddToReschedule}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {selectedWeekDay && (
        <DaySettingsModal
          key={selectedWeekDay.toString()}
          onSaveMealSettings={handleSaveDaySettings}
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          selectedWeekDay={selectedWeekDay}
          planBySelectedDate={getPlanForDay(selectedWeekDay)}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default CalendarForCurrentWeek;
