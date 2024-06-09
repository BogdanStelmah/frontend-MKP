import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { getRandomNumber } from '@/common/utils';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface ListOfTipsSkeletonProps {
  numberOfSkeletons: number;
}

const ListOfTipsSkeleton: React.FC<ListOfTipsSkeletonProps> = ({ numberOfSkeletons }) => {
  return (
    <ScrollView
      className="flex-col w-full mt-[2px]  mb-[60px]"
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2">
            <Skeleton colorMode="light" width={getRandomNumber(140, 220)} height={18} radius={4} />
          </View>

          {Array.from({ length: getRandomNumber(4, 5) }).map((_, index) => (
            <View key={index} className="mb-2 flex-row">
              <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>{index + 1}.</Text2sm>

              <View className="flex mt-[3px]">
                <View className="ml-[6px] mb-1">
                  <Skeleton colorMode="light" width={getRandomNumber(160, 300)} height={17} />
                </View>

                <View className="ml-[6px]">
                  <Skeleton colorMode="light" width={getRandomNumber(120, 160)} height={17} />
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ListOfTipsSkeleton;
