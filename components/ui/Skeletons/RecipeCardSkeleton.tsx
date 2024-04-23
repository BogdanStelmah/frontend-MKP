import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';

interface RecipeCardSkeletonProps {
  size?: 'small' | 'medium';
}

const RecipeCardSkeleton: React.FC<RecipeCardSkeletonProps> = ({ size = 'small' }) => {
  return (
    <View className={size === 'medium' ? 'w-[100%]' : 'w-[131px]'}>
      <Skeleton colorMode="light" width="100%" height={82} radius={3} />

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
