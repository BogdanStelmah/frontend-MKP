import { TypeOption } from '@/common/types';
import i18n from '@/i18n';

export const getCalendarOptionsDictionary = (): TypeOption[] => [
  { label: i18n.t('calendar.calendar-options.this-year'), value: 'thisYear' },
  { label: i18n.t('calendar.calendar-options.this-week'), value: 'thisWeek' }
];
