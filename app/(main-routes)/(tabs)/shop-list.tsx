import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { getGeneralOptions, getRecipeAuthors } from '@/common/dictionary';
import { IPlanItem } from '@/common/entities';
import { FontWeightEnum, UsersTypeEnum } from '@/common/enums';
import { TypeOption } from '@/common/types';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import DateInput from '@/components/ui/DateInput/DateInput';
import NoteInput from '@/components/ui/NoteInput/NoteInput';
import RadioButton from '@/components/ui/RadioButton';
import { RadioGroup } from '@/components/ui/RadioGroup';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TabTitle from '@/components/ui/TabTitle';
import Text2md from '@/components/ui/Typography/Text2md';
import { usePlanItemStore } from '@/store';

const ShopList = () => {
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const [unboughtItems, setUnboughtItems] = useState<IPlanItem[]>([]);
  const [boughtItems, setBoughtItems] = useState<IPlanItem[]>([]);
  const [customItems, setCustomItems] = useState<IPlanItem[]>([]);

  const isLoading = usePlanItemStore.use.isLoading();
  const planItems = usePlanItemStore.use.planItems();
  const fetchPlanItems = usePlanItemStore.use.fetchPlanItems();
  const addCustomItem = usePlanItemStore.use.addCustomItem();
  const markItemAsBought = usePlanItemStore.use.markItemAsBought();
  const markItemAsNotBought = usePlanItemStore.use.markItemAsNotBought();

  useEffect(() => {
    fetchPlanItems(date);
  }, [date]);

  useEffect(() => {
    const unboughtItems = planItems.filter((item) => !item.bought && !item.isCustom);
    const boughtItems = planItems.filter((item) => item.bought);
    const customItems = planItems.filter((item) => item.isCustom && !item.bought);

    setUnboughtItems(unboughtItems);
    setBoughtItems(boughtItems);
    setCustomItems(customItems);
  }, [planItems]);

  const handlePressPlus = () => {
    addCustomItem(date, note);
    setNote('');
  };

  const handleOptionSelect = (
    { value }: TypeOption,
    itemType: 'unbought' | 'bought' | 'custom'
  ) => {
    if (typeof value !== 'number') return;

    if (itemType === 'unbought' || itemType === 'custom') {
      markItemAsBought(value);
    } else {
      markItemAsNotBought(value);
    }
  };

  const getOptions = (items: IPlanItem[]) => {
    return items.map((item) => ({
      label: item.name,
      value: item.id
    }));
  };

  return (
    <ScreenContainer>
      <View className="mx-4">
        <TabTitle
          title="Переглядайте список покупок у налаштовані дні"
          extraTitleStyles="w-[280px]"
        />
      </View>

      <View className="mx-4 items-center">
        <DateInput value={date} onChange={setDate} />

        <View className="mt-[10px] items-center">
          <NoteInput
            value={note}
            onChangeText={setNote}
            onPressPlus={handlePressPlus}
            isDisabled={planItems.length === 0}
          />
        </View>

        <ScrollView
          className="flex-col gap-y-[12px] w-full mt-[2px]"
          showsVerticalScrollIndicator={false}
        >
          {unboughtItems.length > 0 && (
            <View>
              <Text2md
                fontWeight={FontWeightEnum.SEMIBOLD}
                extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark mb-1"
              >
                Продукти
              </Text2md>

              {getOptions(unboughtItems).map((option) => (
                <View className="mb-1">
                  <RadioButton
                    key={option.label}
                    option={option}
                    onPress={(option) => handleOptionSelect(option, 'unbought')}
                  />
                </View>
              ))}
            </View>
          )}

          {customItems.length > 0 && (
            <View>
              <Text2md
                fontWeight={FontWeightEnum.SEMIBOLD}
                extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark mb-1"
              >
                Додаткові
              </Text2md>

              {getOptions(customItems).map((option) => (
                <View className="mb-1">
                  <RadioButton
                    key={option.label}
                    option={option}
                    onPress={(option) => handleOptionSelect(option, 'custom')}
                  />
                </View>
              ))}
            </View>
          )}

          {boughtItems.length > 0 && (
            <View>
              <Text2md
                fontWeight={FontWeightEnum.SEMIBOLD}
                extraStyles="text-green-secondary-2 dark:text-green-secondary-2-dark mb-1"
              >
                Куплені
              </Text2md>

              {getOptions(boughtItems).map((option) => (
                <View className="mb-1">
                  <RadioButton
                    key={option.label}
                    option={option}
                    checked
                    onPress={(option) => handleOptionSelect(option, 'bought')}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default ShopList;
