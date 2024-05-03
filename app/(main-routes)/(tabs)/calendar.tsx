import React, { useState } from 'react';
import { View } from 'react-native';

import { calendarOptionsDictionary } from '@/common/dictionary';
import { TypeOption } from '@/common/types';
import CalendarForCurrentWeek from '@/components/business/Calendar/CalendarForCurrentWeek';
import CalendarForYear from '@/components/business/Calendar/CalendarForYear';
import ScreenContainer from '@/components/ui/ScreenContainer';
import StandardDropdownInput from '@/components/ui/StandardDropdownInput/StandardDropdownInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';

const Calendar = () => {
  const [selectedRange, setSelectedRange] = useState<TypeOption | undefined>(
    calendarOptionsDictionary[1]
  );

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="mx-4">
        <TabTitle title={i18n.t('calendar.tab-title')} extraTitleStyles="w-[280px]" />
      </View>

      <View className="mx-4">
        <View className="items-center mb-[10px]">
          <StandardDropdownInput
            options={calendarOptionsDictionary}
            onSelect={setSelectedRange}
            value={selectedRange}
          />
        </View>

        {selectedRange?.value === 'thisYear' ? <CalendarForYear /> : <CalendarForCurrentWeek />}
      </View>
    </ScreenContainer>
  );
};

export default Calendar;
