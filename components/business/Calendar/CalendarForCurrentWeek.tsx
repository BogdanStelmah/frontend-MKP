import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import AdvicesModal from './AdvicesModal/AdvicesModal';
import DaySettingsModal, { SaveMealSettingsData } from './DaySettingsModal/DaySettingsModal';

import { useModal } from '@/common/hooks';
import { mealCardSettingToMealPlan } from '@/common/mappers';
import { compareDatesWithoutTime, getDatesOfCurrentWeek } from '@/common/utils';
import { PlanningDay } from '@/components/business/Calendar/PlanningDay';
import { RecipeOverviewModal } from '@/components/business/Recipe/RecipeOverviewModal';
import { usePlanStore } from '@/store/planStore';
import { useRecipeStore } from '@/store/recipeStore';

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
  const [selectedRecipe, setSelectedRecipe] = useState<{
    mealPlanToRecipeId: number;
    recipeId: number;
  } | null>(null);
  const [selectedPlanIdWithDate, setSelectedPlanIdWithDate] = useState<{
    planId: number;
    date: string;
  } | null>(null);

  const [isRecipeOverviewModalVisible, showRecipeOverviewModal, hideRecipeOverviewModal] =
    useModal();
  const [isDaySettingsModalVisible, showDaySettingsModal, hideDaySettingsModal] = useModal();
  const [isAdvicesModalVisible, showAdvicesModal, hideAdvicesModal] = useModal();
  const [advicesByPlanId, setAdvicesByPlanId] = useState<{ [key: string]: string[] }>({});

  const plansForCurrentWeek = usePlanStore.use.plansForCurrentWeek();
  const planBySelectedDate = usePlanStore.use.planBySelectedDate();
  const recipeById = useRecipeStore.use.calculatedRecipeForMealPlanById();

  const isLoading = usePlanStore.use.isLoading();
  const isLoadingAdvices = usePlanStore.use.isLoadingAdvices();

  const fetchPlansForCurrentWeek = usePlanStore.use.fetchPlansForCurrentWeek();
  const fetchPlanByDate = usePlanStore.use.fetchPlanByDate();
  const fetchCalculatedRecipeById = useRecipeStore.use.fetchCalculatedRecipeForMealPlanById();
  const fetchAdvicesByPlanId = usePlanStore.use.fetchAdvicesByPlanId();

  const createPlanWithMealPlans = usePlanStore.use.createPlanWithMealPlans();
  const updatePlanWithMealPlans = usePlanStore.use.updatePlanWithMealPlans();
  const deleteRecipeFromMealPlan = usePlanStore.use.deleteRecipeFromMealPlan();

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
    showDaySettingsModal();
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
      await createPlanWithMealPlans(formattedDate, formattedMealPlans, categoryIds);
    } else {
      await updatePlanWithMealPlans({
        planId,
        categoryIds,
        deletedCategoryIds,
        deletedMealCardIds,
        date: formattedDate,
        mealPlans: formattedMealPlans
      });
    }

    if (selectedDate) {
      fetchPlanByDate(selectedDate).catch((err) => console.error(err));
    }
  };

  const handlePressToRecipe = (mealPlanToRecipeId: number, recipeId: number) => {
    fetchCalculatedRecipeById(mealPlanToRecipeId, recipeId).then(() => {
      setSelectedRecipe({ mealPlanToRecipeId, recipeId });
      showRecipeOverviewModal();
    });
  };

  const handlePressRemoveFromReschedule = () => {
    if (!selectedRecipe) return;

    deleteRecipeFromMealPlan(selectedRecipe.mealPlanToRecipeId).then(() => {
      hideRecipeOverviewModal();
      setSelectedRecipe(null);
    });
  };

  const handlePressOnAdvices = (planId: number, date: string) => {
    showAdvicesModal();
    setSelectedPlanIdWithDate({ planId, date });

    fetchAdvicesByPlanId(planId).then((advices) => {
      setAdvicesByPlanId(advices);
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
            onPressOnRecipe={handlePressToRecipe}
            onPressOnAdvices={handlePressOnAdvices}
          />
        </View>
      );
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-[200px]">
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
                onPressOnRecipe={handlePressToRecipe}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {selectedWeekDay && (
        <DaySettingsModal
          key={selectedWeekDay.toString()}
          onSaveMealSettings={handleSaveDaySettings}
          isModalVisible={isDaySettingsModalVisible}
          hideModal={hideDaySettingsModal}
          selectedWeekDay={selectedWeekDay}
          planBySelectedDate={getPlanForDay(selectedWeekDay)}
          isLoading={isLoading}
        />
      )}

      {selectedRecipe?.recipeId && recipeById && (
        <RecipeOverviewModal
          isModalVisible={isRecipeOverviewModalVisible}
          recipe={recipeById}
          hideModal={hideRecipeOverviewModal}
          isRemoveFromReschedule
          onPressAddToReschedule={() => {}}
          onPressRemoveFromReschedule={handlePressRemoveFromReschedule}
        />
      )}

      <AdvicesModal
        isModalVisible={isAdvicesModalVisible}
        hideModal={hideAdvicesModal}
        date={new Date(selectedPlanIdWithDate?.date || '')}
        advices={advicesByPlanId}
        isLoading={isLoadingAdvices}
      />
    </>
  );
};

export default CalendarForCurrentWeek;
