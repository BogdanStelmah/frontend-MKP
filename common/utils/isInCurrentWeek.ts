import { getFirstAndLastDayOfCurrentWeek } from '@/common/utils/getFirstAndLastDayOfCurrentWeek';

export const isInCurrentWeek = (dateToCheck: Date) => {
  const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfCurrentWeek();
  return dateToCheck >= firstDayOfWeek && dateToCheck <= lastDayOfWeek;
};
