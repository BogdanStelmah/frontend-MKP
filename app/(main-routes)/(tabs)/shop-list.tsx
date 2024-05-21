import React, { useState } from 'react';
import { View } from 'react-native';

import DateInput from '@/components/ui/DateInput/DateInput';
import NoteInput from '@/components/ui/NoteInput/NoteInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle';

const ShopList = () => {
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const handlePressPlus = () => {};

  return (
    <ScreenContainer>
      <View className="mx-4">
        <TabTitle
          title="Переглядайте список покупок у налаштовані дні"
          extraTitleStyles="w-[280px]"
        />
      </View>

      <View className="mx-4 mt-[19px] items-center">
        <DateInput value={date} onChange={setDate} />

        <View className="mt-[10px] items-center">
          <NoteInput value={note} onChangeText={setNote} onPressPlus={handlePressPlus} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ShopList;
