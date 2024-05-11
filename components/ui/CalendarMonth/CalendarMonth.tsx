import * as Crypto from 'expo-crypto';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { weekdays } from '@/common/dictionary';
import { IPlan } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums';
import { daysInMonth, getCalendarDays } from '@/common/utils';
import { calculateMonthNumber } from '@/common/utils/calculateMonthNumber';
import { CalendarMonthSkeleton } from '@/components/ui/Skeletons';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface CalendarMonthProps {
  daysData?: IPlan[];
  month: string;
  year: number;
  onPressOnDay?: (date: Date) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  year,
  month,
  onPressOnDay,
  daysData = []
}) => {
  const [monthNumber, setMonthNumber] = useState<number>(0);
  const [monthDays, setMonthDays] = useState<any[]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setMonthNumber(calculateMonthNumber(month));
  }, [month]);

  useEffect(() => {
    setDays(getCalendarDays(daysInMonth(monthNumber, year), monthNumber, year));
  }, [monthNumber, year]);

  useEffect(() => {
    const calculateMonthDays = () => {
      if (days.length === 0) return;

      const start = days[0].toLocaleString('en-us', { weekday: 'short' });
      const emptyAmount = weekdays.findIndex((w) => w === start);

      const classesForDays = setClassesForDays();
      const monthDays = [...Array(emptyAmount), ...classesForDays];

      setMonthDays(monthDays);
    };

    calculateMonthDays();
    setIsLoading(false);
  }, [days]);

  const onPressOnDate = (day: number, monthNumber: number, year: number) => {
    const date = new Date(year, monthNumber, day, 12);
    date.setUTCHours(12);

    onPressOnDay && onPressOnDay(date);
  };

  const setClassesForDays = () => {
    return days.map((date) => {
      date.setHours(12);
      date.setUTCHours(12);

      const d = {
        day: date.getDate(),
        dayOfTheWeek: date.getDay(),
        daysName: date.toLocaleString('en-us', { weekday: 'short' })
      };

      const plan = daysData.find((p) => new Date(p.date).getDate() === d.day);
      if (plan) {
        return {
          ...d,
          additionalStyles: {
            block: 'bg-green-secondary-2 dark:bg-green-secondary-2-dark',
            text: 'text-background dark:text-background-dark'
          }
        };
      }

      return d;
    });
  };

  const getKetForDay = (day: any) => {
    if (day?.day) {
      return day.day + monthNumber + year;
    } else {
      return Crypto.randomUUID();
    }
  };

  return !isLoading ? (
    <View>
      <Text2sm fontWeight={FontWeightEnum.BOLD} extraStyles="mb-[4px]">
        {month}
      </Text2sm>

      <View className="flex-row flex-wrap gap-y-[8px]">
        {monthDays.map((day) => (
          <View key={getKetForDay(day)} className="w-[14.28%] h-[36px] items-center justify-center">
            <TouchableOpacity
              onPress={() => onPressOnDate(day?.day, monthNumber, year)}
              activeOpacity={100}
              className={
                'w-[36px] h-[36px] items-center justify-center rounded-[10px] ' +
                day?.additionalStyles?.block
              }
            >
              <Text2sm
                fontWeight={FontWeightEnum.REGULAR}
                extraStyles={day?.additionalStyles?.text}
              >
                {day?.day}
              </Text2sm>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <CalendarMonthSkeleton month={month} />
  );
};

export default CalendarMonth;
