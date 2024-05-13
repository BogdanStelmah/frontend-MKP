import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { ScrollView, View } from 'react-native';

import AddMealModal from '../AddMealModal/AddMealModal';
import MealCard from '../MealCard/MealCard';

import { getGeneralOptions } from '@/common/dictionary';
import { IPlan } from '@/common/entities';
import { FontWeightEnum } from '@/common/enums';
import { useModal } from '@/common/hooks';
import { mealPlanToMealCardSetting } from '@/common/mappers';
import { MealCardSetting } from '@/common/types';
import { formatDayNumber, isPastDay } from '@/common/utils';
import { formatShortMonthName } from '@/common/utils/formatShortMonthName';
import Button from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { CheckboxValue } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import Modal from '@/components/ui/Modal';
import { SubmitModal } from '@/components/ui/SubmitModal';
import Text2Md from '@/components/ui/Typography/Text2md';
import Text2Sm from '@/components/ui/Typography/Text2sm';
import i18n from '@/i18n';

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
  const [deleteMealCardId, setDeleteMealCardId] = useState<number | string | null>(null);
  const [deletedMealCardIds, setDeletedMealCardIds] = useState<number[]>([]);

  const [isSubmitModalVisible, showSubmitModal, hideSubmitModal] = useModal();
  const [isAddMealCardModalVisible, showAddMealCardModal, hideAddMealCardModal] = useModal();
  const { colorScheme } = useColorScheme();
  const [selectedGeneralOptions, setSelectedGeneralOptions] = React.useState<CheckboxValue[]>([]);

  useEffect(() => {
    if (isEqual(oldPlan, plan)) return setShowSaveButton(false);

    setShowSaveButton(true);
  }, [plan, oldPlan]);

  const handleChangeMealCard = (mealCard: MealCardSetting) => {
    const updatedMealPlan = plan.mealPlan?.map((mealPlan) =>
      mealPlan.id === mealCard.id ? mealCard : mealPlan
    );

    setPlan({ ...plan, mealPlan: updatedMealPlan });
  };

  const handleDeleteMealCard = () => {
    if (!deleteMealCardId) return;
    const updatedMealPlan = plan.mealPlan?.filter((mealPlan) => mealPlan.id !== deleteMealCardId);

    if (typeof deleteMealCardId === 'number') {
      setDeletedMealCardIds([...deletedMealCardIds, deleteMealCardId]);
    }

    setPlan({ ...plan, mealPlan: updatedMealPlan });
    setDeleteMealCardId(null);
  };

  const handleHideModal = () => {
    hideModal();
    if (showSaveButton) setPlan(oldPlan);
  };

  const handleSaveSettings = () => {
    onSaveMealSettings(
      planBySelectedDate?.date || selectedWeekDay,
      plan.mealPlan,
      planBySelectedDate?.id || null,
      deletedMealCardIds
    );
    setShowSaveButton(false);
  };

  const handleAddMealCard = (name: string) => {
    const newMealCard: MealCardSetting = {
      id: new Date().toLocaleString(),
      name,
      preparationEndTime: null,
      preparationStartTime: null,
      mealStartTime: null,
      mealEndTime: null,
      totalNumberOfServings: 1
    };

    setPlan({ ...plan, mealPlan: [...plan.mealPlan, newMealCard] });
    hideAddMealCardModal();
  };

  const generateDescriptionForSubmitModal = (): string => {
    const defaultDescription = i18n.t('calendar.plan.meal-plan.delete-this-meal-description');
    const additionalDescription = i18n.t(
      'calendar.plan.meal-plan.delete-this-meal-description-additional'
    );

    if (typeof deleteMealCardId !== 'number') return defaultDescription;
    return defaultDescription + ' ' + additionalDescription;
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
              <Button onPress={handleHideModal}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
                />
              </Button>
            </View>

            <View className="w-full items-center absolute">
              <Text2Md fontWeight={FontWeightEnum.SEMIBOLD}>
                {i18n.t('calendar.plan.meal-plan.setting-up-the-day')} (
                {formatDayNumber(selectedWeekDay) + ' ' + formatShortMonthName(selectedWeekDay)})
              </Text2Md>
            </View>
          </View>
        }
        footer={
          !isPastDay(selectedWeekDay) && (
            <View className="pt-4 flex-row">
              <Button
                label={i18n.t('calendar.plan.meal-plan.add-a-meal')}
                type="outlined"
                borderRadius="rounded-lg"
                extraStyles="flex-1"
                onPress={showAddMealCardModal}
              />

              {showSaveButton && (
                <Button
                  label={i18n.t('personal-info.save')}
                  type="filled"
                  borderRadius="rounded-lg"
                  extraStyles="flex-1 ml-4"
                  onPress={handleSaveSettings}
                  isLoading={isLoading}
                />
              )}
            </View>
          )
        }
      >
        <ScrollView className="flex-col gap-y-5" showsVerticalScrollIndicator={false}>
          <View>
            <Text2Sm fontWeight={FontWeightEnum.SEMIBOLD} extraStyles="mb-[8px]">
              {i18n.t('calendar.plan.meal-plan.cooking-conditions-description')}
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
                  onChange={handleChangeMealCard}
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
        onSubmit={handleDeleteMealCard}
        onCancel={() => setDeleteMealCardId(null)}
        description={generateDescriptionForSubmitModal()}
      />

      <AddMealModal
        isVisible={isAddMealCardModalVisible}
        hideModal={hideAddMealCardModal}
        onCreateMeal={handleAddMealCard}
      />
    </>
  );
};

export default DaySettingsModal;
