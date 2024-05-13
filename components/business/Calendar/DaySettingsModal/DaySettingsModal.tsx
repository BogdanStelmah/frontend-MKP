import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { ScrollView, View } from 'react-native';

import MealCard from '../MealCard/MealCard';

import { getGeneralOptions } from '@/common/dictionary';
import { IPlan } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums';
import { useModal } from '@/common/hooks';
import { mealPlanToMealCardSetting } from '@/common/mappers';
import { MealCardSetting } from '@/common/types';
import { formatDayNumber } from '@/common/utils';
import { formatShortMonthName } from '@/common/utils/formatShortMonthName';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { CheckboxValue } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import { SubmitModal } from '@/components/ui/SubmitModal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2Sm from '@/components/ui/Typography/Text2sm';

interface DaySettingsModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  selectedWeekDay: Date;
  planBySelectedDate?: IPlan;
  onSaveMealSettings: (
    date: Date | string,
    mealPlans: MealCardSetting[],
    planId: number | null,
    deletedMealCardIds?: number[]
  ) => void;
  isLoading?: boolean;
}

const DaySettingsModal: React.FC<DaySettingsModalProps> = ({
  isModalVisible,
  hideModal,
  selectedWeekDay,
  planBySelectedDate,
  onSaveMealSettings,
  isLoading
}) => {
  const [oldPlan] = useState({
    ...planBySelectedDate,
    mealPlan: planBySelectedDate?.mealPlan?.map(mealPlanToMealCardSetting) || []
  });
  const [plan, setPlan] = useState({ ...oldPlan });
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [deleteMealCardId, setDeleteMealCardId] = useState<number | null>(null);
  const [deletedMealCardIds, setDeletedMealCardIds] = useState<number[]>([]);

  const [isSubmitModalVisible, showSubmitModal, hideSubmitModal] = useModal();
  const { colorScheme } = useColorScheme();
  const [selectedGeneralOptions, setSelectedGeneralOptions] = React.useState<CheckboxValue[]>([]);

  useEffect(() => {
    if (isEqual(oldPlan, plan)) return setShowSaveButton(false);

    setShowSaveButton(true);
  }, [plan, oldPlan]);

  const onChangeMealCard = (mealCard: MealCardSetting) => {
    const updatedMealPlan = plan.mealPlan?.map((mealPlan) =>
      mealPlan.id === mealCard.id ? mealCard : mealPlan
    );

    setPlan({ ...plan, mealPlan: updatedMealPlan });
  };

  const onDeleteMealCard = () => {
    if (!deleteMealCardId) return;
    const updatedMealPlan = plan.mealPlan?.filter((mealPlan) => mealPlan.id !== deleteMealCardId);

    setDeletedMealCardIds([...deletedMealCardIds, deleteMealCardId]);
    setPlan({ ...plan, mealPlan: updatedMealPlan });
    setDeleteMealCardId(null);
  };

  const onHideModal = () => {
    hideModal();
    if (showSaveButton) setPlan(oldPlan);
  };

  const onSaveSettings = () => {
    onSaveMealSettings(
      planBySelectedDate?.date || selectedWeekDay,
      plan.mealPlan,
      planBySelectedDate?.id || null,
      deletedMealCardIds
    );
    setShowSaveButton(false);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onClose={hideModal}
        isFullHeight
        extraStyles="pt-0"
        header={
          <View className="flex-row items-center justify-between h-[32px] mb-[25px]">
            <View>
              <Button onPress={onHideModal}>
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

            {showSaveButton && (
              <Button
                label="Зберегти"
                type="filled"
                borderRadius="rounded-lg"
                extraStyles="flex-1 ml-4"
                onPress={onSaveSettings}
                isLoading={isLoading}
              />
            )}
          </View>
        }
      >
        <ScrollView className="flex-col gap-y-5" showsVerticalScrollIndicator={false}>
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

          {plan &&
            plan.mealPlan?.map((mealPlan) => (
              <View key={mealPlan.id}>
                <MealCard
                  mealPlan={mealPlan}
                  onChange={onChangeMealCard}
                  onDelete={(mealCardId) => {
                    setDeleteMealCardId(mealCardId);
                    showSubmitModal();
                  }}
                />
              </View>
            ))}
        </ScrollView>
      </Modal>

      <SubmitModal
        isVisible={isSubmitModalVisible}
        hideModal={hideSubmitModal}
        onSubmit={onDeleteMealCard}
        onCancel={() => setDeleteMealCardId(null)}
        description="Ви впевнені, що хочете видалити налаштований день? Це призведе до видалення всіх доданих рецептів"
      />
    </>
  );
};

export default DaySettingsModal;
