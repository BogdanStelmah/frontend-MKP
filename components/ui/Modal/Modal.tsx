import classNames from 'classnames';
import React from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  extraStyles?: string;
  isFullHeight?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  isVisible,
  header,
  footer,
  isFullHeight,
  extraStyles
}) => {
  const styleMainBlock = classNames(
    {
      'p-4 bg-background dark:bg-background-dark': true,
      'flex-1': isFullHeight,
      'rounded-t-lg': !isFullHeight
    },
    extraStyles
  );

  const styleChildren = classNames({
    'flex-1': isFullHeight
  });

  if (!isVisible) return null;

  return (
    <ReactNativeModal
      isVisible={isVisible}
      className="m-0"
      backdropOpacity={0.3}
      onBackdropPress={onClose}
    >
      {!isFullHeight && <View className="flex-1" />}

      <View className={styleMainBlock}>
        {header}
        <View className={styleChildren}>{children}</View>
        {footer}
      </View>
    </ReactNativeModal>
  );
};

export default Modal;
