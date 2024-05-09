import classNames from 'classnames';
import React from 'react';
import { View } from 'react-native';

import { weekdays } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import TextSm from '@/components/ui/Typography/TextSm';

interface CalendarWeekdaysProps {
  extraStyles?: string;
}

const CalendarWeekdays: React.FC<CalendarWeekdaysProps> = ({ extraStyles }) => {
  const styleMap = {
    mainBlock: classNames(
      {
        'flex-row justify-between': true
      },
      extraStyles
    ),
    weekday: classNames({
      'w-[42px] h-[36px] items-center justify-center': true
    })
  };

  return (
    <View className={styleMap.mainBlock}>
      {weekdays.map((weekday) => (
        <View key={weekday} className={styleMap.weekday}>
          <TextSm
            fontWeight={FontWeightEnum.SEMIBOLD}
            extraStyles="text-disable dark:text-disable-dark"
          >
            {weekday}
          </TextSm>
        </View>
      ))}
    </View>
  );
};

export default CalendarWeekdays;
