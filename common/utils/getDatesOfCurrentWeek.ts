export const getDatesOfCurrentWeek = (): Date[] => {
  const dates: Date[] = [];
  const currentDate: Date = new Date();
  const currentDay: number = currentDate.getDay(); // 0 (неділя) до 6 (субота)
  const monday: Date = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Визначає понеділок поточного тижня

  for (let i = 0; i < 7; i++) {
    const nextDate: Date = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    dates.push(nextDate);
  }

  return dates;
};
