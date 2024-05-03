export const formatDayNumber = (date: Date): string => {
  const day = date.getDate();
  return day < 10 ? `0${day}` : day.toString();
};
