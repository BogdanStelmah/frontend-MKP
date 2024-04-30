const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getCalendarDays = (days: number, month: number, year: number): Date[] => {
  let calendarDays = [] as Date[];
  for (let day = 0; day < days; day++) {
    calendarDays = [...calendarDays, new Date(year, month, day + 1)];
  }

  return calendarDays;
};

const getDaysInMonth = (month: number, year: number) => {
  return new Array(31)
    .fill('')
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);
};

export { daysInMonth, getCalendarDays, getDaysInMonth };
