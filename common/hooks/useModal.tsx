import { useState } from 'react';
import { Keyboard } from 'react-native'; // Якщо ви використовуєте React Native

type ModalHookReturnType = [boolean, () => void, () => void];

const useModal = (initialVisible: boolean = false): ModalHookReturnType => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible);

  const showModal = (): void => {
    Keyboard.dismiss();
    setIsVisible(true);
  };

  const hideModal = (): void => setIsVisible(false);

  return [isVisible, showModal, hideModal];
};

export default useModal;
