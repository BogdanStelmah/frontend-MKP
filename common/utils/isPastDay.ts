export const isPastDay = (date: Date): boolean => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return date < currentDate;
};
