import React, { useState } from 'react';
import { View } from 'react-native';

import DaySettingsModal from './DaySettingsModal/DaySettingsModal';

import { useModal } from '@/common/hooks';
import { getDatesOfCurrentWeek } from '@/common/utils';
import { PlanningDay } from '@/components/business/Calendar/PlanningDay';

interface CalendarForCurrentWeekProps {}

const CalendarForCurrentWeek: React.FC<CalendarForCurrentWeekProps> = () => {
  const [selectedWeekDay, setSelectedWeekDay] = useState<Date | null>(null);

  const [isModalVisible, showModal, hideModal] = useModal();

  const handlePressOnSettings = (date: Date) => {
    setSelectedWeekDay(date);
    showModal();
  };

  return (
    <>
      <View className="flex-col gap-y-[20px]">
        {getDatesOfCurrentWeek().map((date) => (
          <View key={date.toString()}>
            <PlanningDay date={date} onPressOnSettings={handlePressOnSettings} />
          </View>
        ))}
      </View>

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
