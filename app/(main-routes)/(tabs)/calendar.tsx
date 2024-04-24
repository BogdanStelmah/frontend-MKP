import React from 'react';
import { View } from 'react-native';

import { calendarOptionsDictionary } from '@/common/dictionary';
import ScreenContainer from '@/components/ui/ScreenContainer';
import StandardDropdownInput from '@/components/ui/StandardDropdownInput/StandardDropdownInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';

const Calendar = () => {
  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="mx-4">
        <TabTitle title={i18n.t('calendar.tab-title')} extraTitleStyles="w-[280px]" />
      </View>

      <View>
        <View className="items-center">
          <StandardDropdownInput
            options={calendarOptionsDictionary}
            onSelect={(option) => console.log(option)}
            value={calendarOptionsDictionary[0]}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Calendar;
