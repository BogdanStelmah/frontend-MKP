import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import DaySettingsModal from './DaySettingsModal/DaySettingsModal';

import { useModal } from '@/common/hooks';
import { compareDatesWithoutTime, getDatesOfCurrentWeek } from '@/common/utils';
import { PlanningDay } from '@/components/business/Calendar/PlanningDay';
import { usePlanStore } from '@/store/planStore';

interface CalendarForCurrentWeekProps {}

const CalendarForCurrentWeek: React.FC<CalendarForCurrentWeekProps> = () => {
  const [selectedWeekDay, setSelectedWeekDay] = useState<Date | null>(null);
  const [isModalVisible, showModal, hideModal] = useModal();

  const plansForCurrentWeek = usePlanStore.use.plansForCurrentWeek();
  const isLoading = usePlanStore.use.isLoading();

  const fetchPlansForCurrentWeek = usePlanStore.use.fetchPlansForCurrentWeek();

  useEffect(() => {
    fetchPlansForCurrentWeek().catch((err) => console.error(err));
  }, []);

  const getPlanForDay = (date: Date) => {
    return plansForCurrentWeek.find((plan) => compareDatesWithoutTime(plan.date, date));
  };

  const handlePressOnSettings = (date: Date) => {
    setSelectedWeekDay(date);
    showModal();
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-[220px]">
        <View className="flex-col gap-y-[20px]" onStartShouldSetResponder={() => true}>
          {getDatesOfCurrentWeek().map((date) => (
            <View key={date.toString()}>
              <PlanningDay
                date={date}
                onPressOnSettings={handlePressOnSettings}
                plan={getPlanForDay(date)}
                isLoading={isLoading}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {selectedWeekDay && (
        <DaySettingsModal
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          selectedWeekDay={selectedWeekDay}
        />
      )}
    </>
  );
};

export default CalendarForCurrentWeek;
