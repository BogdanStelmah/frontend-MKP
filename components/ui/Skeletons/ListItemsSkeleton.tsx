import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { getRandomNumber } from '@/common/utils';

interface ListItemsSkeletonProps {
  numberOfSkeletons: number;
}

const ListItemsSkeleton: React.FC<ListItemsSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <ScrollView
      className="flex-col gap-y-[12px] w-full mt-[2px]"
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <View key={index}>
          <View className="mb-1">
            <Skeleton colorMode="light" width={120} height={18} radius={4} />
          </View>

          {Array.from({ length: getRandomNumber(4, 8) }).map((_, index) => (
            <View key={index} className="mb-1 flex-row items-center">
              <Skeleton colorMode="light" width={23} height={23} radius="round" />

              <View className="ml-[6px]">
                <Skeleton colorMode="light" width={getRandomNumber(120, 160)} height={15} />
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ListItemsSkeleton;
