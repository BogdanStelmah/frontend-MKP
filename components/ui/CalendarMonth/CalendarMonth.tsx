import * as Crypto from 'expo-crypto';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { months, weekdays } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import { daysInMonth, getCalendarDays } from '@/common/utils';
import { CalendarMonthSkeleton } from '@/components/ui/Skeletons';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface CalendarMonthProps {
  month: string;
  year: number;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ year, month }) => {
  const [monthNumber, setMonthNumber] = useState<number>(0);
  const [monthDays, setMonthDays] = useState<any[]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const calculateMonthNumber = () => {
      const index = months.findIndex((m) => m === month);
      setMonthNumber(index);
    };

    calculateMonthNumber();
  }, [month]);

  useEffect(() => {
    const calculateDays = () => {
      const days = getCalendarDays(daysInMonth(monthNumber, year), monthNumber, year);
      setDays(days);
    };

    calculateDays();
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

  const pressOnDate = (day: number, monthNumber: number, year: number) => {
    const date = new Date(year, monthNumber, day, 12);
    date.setUTCHours(12);

    console.log(date);
  };

  const setClassesForDays = () => {
    return days.map((date) => {
      date.setHours(12);
      date.setUTCHours(12);

      // TODO: add classes for active days

      return {
        day: date.getDate(),
        dayOfTheWeek: date.getDay(),
        daysName: date.toLocaleString('en-us', { weekday: 'short' })
      };
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
              onPress={() => pressOnDate(day?.day, monthNumber, year)}
              activeOpacity={100}
              className="w-[36px] h-[36px] items-center justify-center"
            >
              <Text2sm fontWeight={FontWeightEnum.REGULAR}>{day?.day}</Text2sm>
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
