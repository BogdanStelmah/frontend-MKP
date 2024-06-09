import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { formatTime } from '@/common/utils/formatTime';
import Text2sm from '@/components/ui/Typography/Text2sm';
import i18n from '@/i18n';

interface TimeInputProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ onChange, value }) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    if (event.type === 'dismissed') return setShow(false);

    if (event.type === 'neutralButtonPressed') {
      onChange && onChange(null);
      return setShow(false);
    }

    if (!date) return setShow(false);
    onChange && onChange(date);
    setShow(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="border border-brown-camouflage dark:border-brown-camouflage-dark rounded-lg px-[10px] py-[1px] items-center"
      >
        <Text2sm
          fontWeight={FontWeightEnum.MEDIUM}
          extraStyles="text-black-greyscale-main dark:text-black-greyscale-main-dark"
        >
          {value ? formatTime(value) : 'XX:XX'}
        </Text2sm>
      </TouchableOpacity>

      {show && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="time"
          display="spinner"
          onChange={handleChange}
          neutralButton={{ label: i18n.t('general.time-input.clear') }}
          negativeButton={{ label: '' }}
        />
      )}
    </View>
  );
};

export default TimeInput;
