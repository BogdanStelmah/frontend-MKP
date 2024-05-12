import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { Image, View } from 'react-native';

const MealPlanSkeleton = () => {
  return (
    <View className="ml-[15px] mt-1">
      <View className="mb-1">
        <Skeleton colorMode="light" width={100} height={12} radius={2} />
      </View>

      {Array.from({ length: 2 }).map((_, index) => (
        <View className="flex-row items-center mt-2">
          <Image
            style={{ height: 41, width: 63 }}
            source={require('../../../assets/images/slide-1.png')}
            className="rounded-sm opacity-80"
          />

          <View className="ml-[10px]">
            <View className="mb-2">
              <Skeleton colorMode="light" width={120} height={12} radius={2} />
            </View>

            <Skeleton colorMode="light" width={90} height={12} radius={2} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default MealPlanSkeleton;
