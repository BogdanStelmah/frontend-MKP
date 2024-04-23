import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import { RadioGroup } from '@/components/ui/RadioGroup';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';

interface RecipeFiltersModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

const RecipeFiltersModal: React.FC<RecipeFiltersModalProps> = ({ isModalVisible, hideModal }) => {
  const [amountOfFilters, setAmountOfFilters] = useState<number>(0);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleCheckboxGroupChange = (newSelectedValues: string[]) => {
    setSelectedValues(newSelectedValues);
  };

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
              <AntDesign name="arrowleft" size={24} color="#454545" />
            </Button>
          </View>

          <View className="w-full items-center absolute">
            <Text2md fontWeight={FontWeightEnum.SEMIBOLD}>
              {i18n.t('recipe-search.filters.title')}{' '}
              {amountOfFilters > 0 && `(${amountOfFilters})`}
            </Text2md>
          </View>
        </View>
      }
    >
      <ScrollView className="flex-col gap-y-[14px]" showsVerticalScrollIndicator={false}>
        <CheckboxGroup
          options={options}
          selectedValues={selectedValues}
          onChange={handleCheckboxGroupChange}
        />
        <RadioGroup options={options} onSelect={() => {}} />
      </ScrollView>
    </Modal>
  );
};

export default RecipeFiltersModal;
