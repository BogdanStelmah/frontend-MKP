import React from 'react';
import { View } from 'react-native';

import RecipeCardSkeleton from '@/components/ui/Skeletons/RecipeCardSkeleton';

interface RecipeListSkeletonProps {
  numberOfSkeletons: number;
}

const RecipeListSkeleton: React.FC<RecipeListSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <View className="flex-wrap flex-row m-4">
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <View key={index} className={index % 2 !== 1 ? 'pr-2 w-[50%] mb-4' : 'pl-2 w-[50%] mb-4'}>
          <RecipeCardSkeleton size="medium" />
        </View>
      ))}
    </View>
  );
};

export default RecipeListSkeleton;
