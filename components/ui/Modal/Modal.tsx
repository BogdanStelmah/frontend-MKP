import React from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import CloseIcon from '@/assets/icons/close.svg';
import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Button from '@/components/ui/Button';
import Text2Md from '@/components/ui/Typography/Text2md';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, isVisible }) => {
  if (!isVisible) return null;

  return (
    <ReactNativeModal
      isVisible={isVisible}
      className="m-0"
      backdropOpacity={0.3}
      onBackdropPress={onClose}>
      <View className="flex-1" />

      <View className="p-4 bg-background rounded-t-lg">
        <View className="flex flex-row items-center justify-between pb-4">
          <Text2Md fontWeight={FontWeightEnum.BOLD}>{title}</Text2Md>

          <Button onPress={onClose}>
            <CloseIcon />
          </Button>
        </View>

        <View>{children}</View>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;
