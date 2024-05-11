import React, { useEffect } from 'react';

import { CalendarFull } from '@/components/ui/CalendarFull';
import { usePlanStore } from '@/store/planStore';

const CalendarForYear = () => {
  const plansForCurrentYear = usePlanStore.use.plansForCurrentYear();
  const fetchPlansForCurrentYear = usePlanStore.use.fetchPlansForCurrentYear();
  const isLoading = usePlanStore.use.isLoading();

  useEffect(() => {
    fetchPlansForCurrentYear().catch((err) => console.error(err));
  }, []);

  return (
    <CalendarFull
      extraStyles="mb-[90px]"
      isScrollingToCurrentMonth
      isLoading={isLoading}
      plans={plansForCurrentYear}
      onPressOnDay={(date) => {
        console.log(date);
      }}
    />
  );
};

export default CalendarForYear;
