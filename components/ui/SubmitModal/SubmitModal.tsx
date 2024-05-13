import React from 'react';
import { View } from 'react-native';

import CloseIcon from '@/assets/icons/close.svg';
import { FontWeightEnum } from '@/common/enums';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface SubmitModalProps {
  description: string;
  isVisible: boolean;
  hideModal: () => void;
  onCancel?: () => void;
  onSubmit: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  hideModal,
  isVisible,
  onSubmit,
  onCancel,
  description
}) => {
  const handleCancel = () => {
    hideModal();
    onCancel && onCancel();
  };

  const handleSuccess = () => {
    hideModal();
    onSubmit();
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={handleCancel}
      header={
        <View className="flex flex-row items-center justify-between pb-4">
          <Text2Md fontWeight={FontWeightEnum.BOLD}>Підтвердження</Text2Md>

          <Button onPress={handleCancel}>
            <CloseIcon />
          </Button>
        </View>
      }
      footer={
        <View className="flex flex-row justify-between mt-6">
          <View className="flex-1 mr-4">
            <Button
              onPress={handleCancel}
              type="outlined"
              borderRadius="rounded-lg"
              label="Скасувати"
            />
          </View>

          <View className="flex-1">
            <Button
              onPress={handleSuccess}
              type="filled"
              borderRadius="rounded-lg"
              label="Підтвердити"
            />
          </View>
        </View>
      }
    >
      <Text2sm fontWeight={FontWeightEnum.MEDIUM}>{description}</Text2sm>
    </Modal>
  );
};

export default SubmitModal;
