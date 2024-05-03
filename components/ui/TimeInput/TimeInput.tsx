import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { formatTime } from '@/common/utils/formatTime';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface TimeInputProps {
  value: Date;
  onChange: (value: Date) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ onChange, value }) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    if (!date) return setShow(false);

    onChange && onChange(date);
    setShow(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="border border-brown-camouflage rounded-lg px-[10px] py-[1px]"
      >
        <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="text-black-greyscale-main">
          {formatTime(value)}
        </Text2sm>
      </TouchableOpacity>

      {show && (
        <RNDateTimePicker value={value} mode="time" display="spinner" onChange={handleChange} />
      )}
    </View>
  );
};

export default TimeInput;
