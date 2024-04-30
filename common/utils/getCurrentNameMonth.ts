import { months } from '@/common/dictionary/months.dictionary';

export const getCurrentNameMonth = () => {
  return months[new Date().getMonth()];
};
