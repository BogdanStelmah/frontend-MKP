import { Feather } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';

interface DateInputProps {
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
}

const DateInput: React.FC<DateInputProps> = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);

  const { colorScheme } = useColorScheme();

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handlePrevDay = () => {
    onChange((prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    onChange((prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)));
  };

  const handleOpenCalendar = () => {
    setOpen(true);
  };

  const handleChange = (event: any, date: Date | undefined) => {
    if (event.type === 'dismissed') return setOpen(false);

    if (event.type === 'neutralButtonPressed') {
      onChange?.(new Date());
      return setOpen(false);
    }

    if (!date) return setOpen(false);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <View className="flex-row items-center">
      <View className="flex-row items-center mr-[15px]">
        <TouchableOpacity onPress={handlePrevDay} className="mr-[10px]">
          <Feather
            name="arrow-left-circle"
            size={20}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text2md fontWeight={FontWeightEnum.BOLD}>{formatDate(value)}</Text2md>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDay} className="ml-[10px]">
          <Feather
            name="arrow-right-circle"
            size={20}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={handleOpenCalendar}>
          <Feather
            name="calendar"
            size={24}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>
      </View>

      {open && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="date"
          display="spinner"
          onChange={handleChange}
          neutralButton={{ label: i18n.t('general.time-input.clear') }}
          negativeButton={{ label: '' }}
        />
      )}
    </View>
  );
};

export default DateInput;
