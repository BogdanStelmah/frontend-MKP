import React, { useEffect, useState } from 'react';

import { useModal } from '@/common/hooks';
import { PlanForSelectedDayModal } from '@/components/business/Calendar/PlanForSelectedDayModal';
import { CalendarFull } from '@/components/ui/CalendarFull';
import { usePlanStore } from '@/store/planStore';

const CalendarForYear = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalVisible, showModal, hideModal] = useModal();

  const plansForCurrentYear = usePlanStore.use.plansForCurrentYear();
  const fetchPlansForCurrentYear = usePlanStore.use.fetchPlansForCurrentYear();
  const isLoading = usePlanStore.use.isLoadedPlansForCurrentYear();

  useEffect(() => {
    fetchPlansForCurrentYear().catch((err) => console.error(err));
  }, []);

  const handlePressOnDay = (date: Date) => {
    setSelectedDate(date);
    showModal();
  };

  const handleHideModal = () => {
    setSelectedDate(null);
    hideModal();
  };

  return (
    <>
      <CalendarFull
        extraStyles="mb-[90px]"
        isScrollingToCurrentMonth
        isLoading={isLoading}
        plans={plansForCurrentYear}
        onPressOnDay={handlePressOnDay}
      />

      {selectedDate && (
        <PlanForSelectedDayModal
          selectedDate={selectedDate}
          isModalVisible={isModalVisible}
          hideModal={handleHideModal}
        />
      )}
    </>
  );
};

export default CalendarForYear;
