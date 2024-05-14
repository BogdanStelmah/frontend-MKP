import { getFirstAndLastDayOfCurrentWeek } from '@/common/utils/getFirstAndLastDayOfCurrentWeek';

export const isPastDayOfWeek = (date: Date): boolean => {
  const { firstDayOfWeek } = getFirstAndLastDayOfCurrentWeek();

  firstDayOfWeek.setHours(0, 0, 0, 0);

  return date < firstDayOfWeek;
};
