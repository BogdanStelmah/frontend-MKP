import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import TimeInput from '../../../ui/TimeInput/TimeInput';

import { FontWeightEnum } from '@/common/enums';
import Text2md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';

const MealCard = () => {
  const { colorScheme } = useColorScheme();

  const [settings, setSettings] = useState({
    preparationStartTime: new Date(),
    preparationEndTime: new Date(),
    mealStartTime: new Date(),
    mealEndTime: new Date(),
    portions: 1
  });

  return (
    <View className="p-[5px] bg-chosen rounded-lg">
      <View className="flex-row items-center justify-between mb-[10px]">
        <Text2md fontWeight={FontWeightEnum.BOLD}>Сніданок</Text2md>
        <TouchableOpacity>
          <Ionicons
            name="close"
            size={24}
            color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
          />
        </TouchableOpacity>
      </View>

      <View className="flex gap-y-[20px]">
        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Виділений час для приготування:</Text2sm>

          <View className="flex-row items-center mt-[2px]">
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mr-[10px]">
              від
            </Text2sm>
            <TimeInput
              value={settings.preparationStartTime}
              onChange={(value) => setSettings({ ...settings, preparationStartTime: value })}
            />
            <Text2sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mx-[10px]">
              до
            </Text2sm>
            <TimeInput
              value={settings.preparationEndTime}
              onChange={(value) => setSettings({ ...settings, preparationEndTime: value })}
            />
          </View>
        </View>

        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Час трапези:</Text2sm>
        </View>

        <View>
          <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>Кількість порцій:</Text2sm>
        </View>
      </View>
    </View>
  );
};

export default MealCard;
