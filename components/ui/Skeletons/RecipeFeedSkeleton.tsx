import React from 'react';
import { ScrollView, View } from 'react-native';

import RecipeCardSkeleton from '@/components/ui/Skeletons/RecipeCardSkeleton';

interface RecipeFeedSkeletonProps {
  numberOfSkeletons: number;
}

const RecipeFeedSkeleton: React.FC<RecipeFeedSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-x-[15px]">
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
          <View key={index}>
            <RecipeCardSkeleton />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecipeFeedSkeleton;
