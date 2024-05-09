import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, View } from 'react-native';

import MealCard from '../MealCard/MealCard';

import { getGeneralOptions } from '@/common/dictionary';
import { FontWeightEnum } from '@/common/enums';
import { formatDayNumber } from '@/common/utils';
import { formatShortMonthName } from '@/common/utils/formatShortMonthName';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { CheckboxValue } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2Sm from '@/components/ui/Typography/Text2sm';

interface DaySettingsModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  selectedWeekDay: Date;
}

const DaySettingsModal: React.FC<DaySettingsModalProps> = ({
  isModalVisible,
  hideModal,
  selectedWeekDay
}) => {
  const { colorScheme } = useColorScheme();
  const [selectedGeneralOptions, setSelectedGeneralOptions] = React.useState<CheckboxValue[]>([]);

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      isFullHeight
      extraStyles="pt-0"
      header={
        <View className="flex-row items-center justify-between h-[32px] mb-[14px]">
          <View>
            <Button onPress={hideModal}>
              <AntDesign
                name="arrowleft"
                size={24}
                color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
              />
            </Button>
          </View>

          <View className="w-full items-center absolute">
            <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
              Налаштування дня (
              {formatDayNumber(selectedWeekDay) + ' ' + formatShortMonthName(selectedWeekDay)})
            </Text2Md>
          </View>
        </View>
      }
      footer={
        <View className="pt-4 flex-row">
          <Button
            label="Додати прийом їжі"
            type="outlined"
            borderRadius="rounded-lg"
            extraStyles="flex-1"
          />

          <Button
            label="Зберегти"
            type="filled"
            borderRadius="rounded-lg"
            extraStyles="flex-1 ml-4"
          />
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
        <View>
          <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mb-[8px]">
            Оберіть критерії які опишуть ваші умови для приготування:
          </Text2Sm>

          <CheckboxGroup
            options={getGeneralOptions()}
            selectedValues={selectedGeneralOptions}
            onChange={setSelectedGeneralOptions}
            extraStylesRadioButton="mb-1"
          />
        </View>

        <View>
          <MealCard />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default DaySettingsModal;
