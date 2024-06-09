import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';

interface CalendarMonthSkeletonProps {
  month: number | string;
}

const CalendarMonthSkeleton: React.FC<CalendarMonthSkeletonProps> = ({ month }) => {
  return (
    <View>
      <View className="mb-[4px]">
        <Skeleton colorMode="light" width="20%" height={14} radius={3} />
      </View>

      <View className="flex-row flex-wrap gap-y-[18px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index.toString() + month.toString()}>
            <Skeleton colorMode="light" width="100%" height={30} radius={2} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarMonthSkeleton;
