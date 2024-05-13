import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import CalendarForCurrentWeek from '@/components/business/Calendar/CalendarForCurrentWeek';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';

interface PlanForSelectedDayModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  selectedDate: Date;
}

const PlanForSelectedDayModal: React.FC<PlanForSelectedDayModalProps> = ({
  isModalVisible,
  hideModal,
  selectedDate
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      isFullHeight
      extraStyles="pt-0"
      header={
        <View className="flex-row items-center justify-between h-[32px] mb-[25px]">
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
              {i18n.t('calendar.plan.view-the-selected-day')}
            </Text2Md>
          </View>
        </View>
      }
    >
      <CalendarForCurrentWeek selectedDate={selectedDate} />
    </Modal>
  );
};

export default PlanForSelectedDayModal;
