import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, View } from 'react-native';

import ListOfTipsSkeleton from '../../../ui/Skeletons/ListOfTipsSkeleton';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import { formatDayName } from '@/common/utils/formatDayName';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';
import TextMd from '@/components/ui/Typography/TextMd';

interface AdvicesModalModalProps {
  date: Date;
  advices: { [key: string]: string[] };
  isModalVisible: boolean;
  isLoading: boolean;
  hideModal: () => void;
}

const AdvicesModal: React.FC<AdvicesModalModalProps> = ({
  isModalVisible,
  hideModal,
  date,
  advices,
  isLoading
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={hideModal}
      header={
        <View className="flex flex-row items-center mb-4">
          <Button onPress={hideModal} extraStyles="mr-[8px]">
            <AntDesign
              name="arrowleft"
              size={24}
              color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
            />
          </Button>

          <Text2Md fontWeight={FontWeightEnum.BOLD}>
            Поради на {formatDayName(date).toLowerCase()}
          </Text2Md>
        </View>
      }
    >
      {isLoading ? (
        <ListOfTipsSkeleton numberOfSkeletons={3} />
      ) : (
        <ScrollView
          className="flex-col w-full mt-[2px] mb-[60px]"
          showsVerticalScrollIndicator={false}
        >
          {Object.keys(advices).map((adviceKey) => (
            <View key={adviceKey} className="mb-4">
              <View className="mb-2">
                <TextMd fontWeight={FontWeightEnum.SEMIBOLD}>{adviceKey}</TextMd>
              </View>

              {advices[adviceKey].map((advice, index) => (
                <View key={advice} className="mb-2 flex-row">
                  <Text2sm fontWeight={FontWeightEnum.SEMIBOLD}>{index + 1}.</Text2sm>

                  <Text2sm
                    fontWeight={FontWeightEnum.SEMIBOLD}
                    extraStyles="text-justify ml-[6px] mr-1 mb-1 flex-1"
                  >
                    {advice.split(' ').slice(1).join(' ')}
                  </Text2sm>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </Modal>
  );
};

export default AdvicesModal;
