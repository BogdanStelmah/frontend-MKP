export const getFirstAndLastDayOfCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();

  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const diffToSunday = currentDay === 0 ? 0 : 7 - currentDay;

  const firstDayOfWeek = new Date(today.getTime() + diffToMonday * 24 * 60 * 60 * 1000);
  const lastDayOfWeek = new Date(today.getTime() + diffToSunday * 24 * 60 * 60 * 1000);

  return {
    firstDayOfWeek,
    lastDayOfWeek
  };
};
