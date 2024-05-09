import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { formatDayNumber } from '@/common/utils';
import { formatDayName } from '@/common/utils/formatDayName';
import { formatShortMonthName } from '@/common/utils/formatShortMonthName';
import TextMd from '@/components/ui/Typography/TextMd';
import TextSm from '@/components/ui/Typography/TextSm';

interface PlanningDayProps {
  date: Date;
  onPressOnSettings: (date: Date) => void;
}

const PlanningDay: React.FC<PlanningDayProps> = ({ date, onPressOnSettings }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <View className="bg-green-secondary-2 dark:bg-green-secondary-2-dark rounded-[10px] px-[5px] pt-[2px] pb-[3px] items-center mr-[5px]">
          <TextSm
            fontWeight={FontWeightEnum.SEMIBOLD}
            extraStyles="text-background dark:text-background-dark"
          >
            {formatDayNumber(date)}
          </TextSm>
          <TextSm
            fontWeight={FontWeightEnum.SEMIBOLD}
            extraStyles="text-background dark:text-background-dark"
          >
            {formatShortMonthName(date)}
          </TextSm>
        </View>

        <View>
          <TextMd fontWeight={FontWeightEnum.SEMIBOLD}>{formatDayName(date)}</TextMd>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => onPressOnSettings(date)}>
          <Feather
            name="settings"
            size={24}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlanningDay;
