import { months } from '@/common/dictionary';

export const calculateMonthNumber = (month: string) => {
  return months.findIndex((m) => m === month);
};
