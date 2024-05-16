import React, { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';

import CalendarMonth from '../CalendarMonth/CalendarMonth';

import { months } from '@/common/dictionary';
import { IPlan } from '@/common/entities';
import { filterPlansByMonth, getCurrentNameMonth, getCurrentYear } from '@/common/utils';
import { calculateMonthNumber } from '@/common/utils/calculateMonthNumber';
import { CalendarWeekdays } from '@/components/ui/CalendarWeekdays';

interface CalendarFullProps {
  isLoading?: boolean;
  plans?: IPlan[];
  extraStyles?: string;
  isScrollingToCurrentMonth?: boolean;
  onPressOnDay?: (date: Date) => void;
}

const CalendarFull: React.FC<CalendarFullProps> = ({
  extraStyles,
  isScrollingToCurrentMonth,
  isLoading,
  onPressOnDay,
  plans = []
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const targetCurrentMonth = useRef<View>(null);

  const scrollToCurrentMonth = (yCoordinate: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yCoordinate, animated: true });
    }
  };

  const setYCoordinateForCurrentMonth = (month: string) => {
    if (!isScrollingToCurrentMonth) return;

    if (month !== getCurrentNameMonth()) return;

    if (scrollViewRef?.current && targetCurrentMonth?.current) {
      targetCurrentMonth.current.measureLayout(scrollViewRef.current, (x, y, width, height) => {
        scrollToCurrentMonth(y);
      });
    }
  };

  const daysData = useCallback(
    (month: string) => {
      return filterPlansByMonth(plans, calculateMonthNumber(month));
    },
    [plans]
  );

  return (
    <View className={extraStyles}>
      <CalendarWeekdays extraStyles="mb-[10px]" />

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <View className="flex-col gap-y-[20px]" onStartShouldSetResponder={() => true}>
          {!isLoading &&
            months.map((month) => (
              <View
                key={month}
                ref={month === getCurrentNameMonth() ? targetCurrentMonth : null}
                onLayout={() => setYCoordinateForCurrentMonth(month)}
              >
                <CalendarMonth
                  month={month}
                  year={getCurrentYear()}
                  onPressOnDay={onPressOnDay}
                  daysData={daysData(month)}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarFull;
