import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';

const RecipeCardSkeleton = () => {
  return (
    <View>
      <Skeleton colorMode="light" width={131} height={82} radius={3} />

      <View className="mt-[7px] mx-[2px]">
        <Skeleton colorMode="light" width={120} height={12} radius={2} />
      </View>

      <View className="mt-[4px] mx-[2px]">
        <Skeleton colorMode="light" width={90} height={12} radius={2} />
      </View>
    </View>
  );
};

export default RecipeCardSkeleton;
