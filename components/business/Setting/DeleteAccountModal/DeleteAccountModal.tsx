import React from 'react';
import { View } from 'react-native';

import CloseIcon from '@/assets/icons/close.svg';
import { FontWeightEnum } from '@/common/enums';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface DeleteAccountModalProps {
  isVisible: boolean;
  hideModal: () => void;
  onSubmit: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  hideModal,
  isVisible,
  onSubmit
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onClose={hideModal}
      header={
        <View className="flex flex-row items-center justify-between pb-4">
          <Text2Md fontWeight={FontWeightEnum.BOLD}>Підтвердження</Text2Md>

          <Button onPress={hideModal}>
            <CloseIcon />
          </Button>
        </View>
      }
      footer={
        <View className="flex flex-row justify-between mt-6">
          <View className="flex-1 mr-4">
            <Button
              onPress={hideModal}
              type="outlined"
              borderRadius="rounded-lg"
              label="Скасувати"
            />
          </View>

          <View className="flex-1">
            <Button
              onPress={onSubmit}
              type="filled"
              borderRadius="rounded-lg"
              label="Підтвердити"
            />
          </View>
        </View>
      }
    >
      <Text2sm fontWeight={FontWeightEnum.MEDIUM}>
        Будь ласка, підтвердіть, що ви хочете повністю видалити свій обліковий запис і втратити
        доступ до сховища рецептів?
      </Text2sm>
    </Modal>
  );
};

export default DeleteAccountModal;
