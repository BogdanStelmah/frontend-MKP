import React, { useState } from 'react';
import { View } from 'react-native';

import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import TextInput from '../TextInput/TextInput';

import { TypeOption } from '@/common/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import RadioGroup from '@/components/ui/RadioGroup';

interface DropdownInputProps {
  title: string;
  label: string;
  buttonLabel: string;
  placeholder: string;
  options: TypeOption[];
  value?: TypeOption;
  onSelect: (selectedOption: TypeOption | undefined) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  value,
  label,
  buttonLabel,
  placeholder,
  options,
  title,
  onSelect
}) => {
  const [selectedOption, setSelectedOption] = useState<TypeOption | undefined>(value);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const onSave = () => {
    hideModal();
    onSelect(selectedOption);
  };

  return (
    <>
      <View>
        <TextInput
          label={label}
          placeholder={placeholder}
          isEditable={false}
          onPress={showModal}
          value={selectedOption?.label}
        />

        <View className="absolute top-[35px] right-4">
          <Button onPress={showModal}>
            <ChevronDownIcon />
          </Button>
        </View>
      </View>

      <Modal isVisible={isModalVisible} onClose={hideModal} title={title}>
        <RadioGroup
          options={options}
          onSelect={setSelectedOption}
          extraStylesRadioButton="my-4"
          value={selectedOption}
        />

        <Button
          label={buttonLabel}
          type="filled"
          onPress={onSave}
          isDisabled={!selectedOption}
          borderRadius="rounded-lg"
          extraStyles="mt-4"
        />
      </Modal>
    </>
  );
};

export default DropdownInput;
