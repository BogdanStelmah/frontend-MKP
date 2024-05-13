import { getFirstAndLastDayOfCurrentWeek } from '@/common/utils/getFirstAndLastDayOfCurrentWeek';

export const isInCurrentWeek = (dateToCheck: Date) => {
  const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfCurrentWeek();

  const startOfFirstDay = new Date(
    firstDayOfWeek.getFullYear(),
    firstDayOfWeek.getMonth(),
    firstDayOfWeek.getDate()
  );

  const endOfLastDay = new Date(
    lastDayOfWeek.getFullYear(),
    lastDayOfWeek.getMonth(),
    lastDayOfWeek.getDate(),
    23,
    59,
    59,
    999
  );

  return dateToCheck >= startOfFirstDay && dateToCheck <= endOfLastDay;
};
