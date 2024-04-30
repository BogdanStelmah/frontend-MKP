import React from 'react';

import { CalendarFull } from '@/components/ui/CalendarFull';

const CalendarForYear = () => {
  return <CalendarFull extraStyles="mb-[90px]" isScrollingToCurrentMonth />;
};

export default CalendarForYear;
