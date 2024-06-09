export const compareDatesWithoutTime = (date1: Date | string, date2: Date | string): boolean => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};
