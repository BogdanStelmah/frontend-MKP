import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface RecipeFeedSkeletonProps {
  numberOfSkeletons: number;
}

const RecipeFeedSkeleton: React.FC<RecipeFeedSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-x-[15px]">
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
          <View key={index}>
            <Skeleton colorMode="light" width={131} height={82} radius={3} />

            <View className="mt-[7px] mx-[2px]">
              <Skeleton colorMode="light" width={120} height={12} radius={2} />
            </View>

            <View className="mt-[4px] mx-[2px]">
              <Skeleton colorMode="light" width={90} height={12} radius={2} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecipeFeedSkeleton;
