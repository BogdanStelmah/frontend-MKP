import { IPlan } from '@/common/entities';

export const filterPlansByMonth = (plans: IPlan[], targetMonth: number): IPlan[] => {
  return plans.filter(({ date }) => new Date(date).getMonth() === targetMonth);
};
