import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { IPlanItem } from '@/common/entities';
import { TypeOption } from '@/common/types';
import DateInput from '@/components/ui/DateInput/DateInput';
import { ListItems } from '@/components/ui/ListItems';
import NoteInput from '@/components/ui/NoteInput/NoteInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { ListItemsSkeleton } from '@/components/ui/Skeletons';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';
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
        <TabTitle title={i18n.t('shop-list.tab-title')} extraTitleStyles="w-[280px]" />
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

        {isLoading ? (
          <ListItemsSkeleton numberOfSkeletons={3} />
        ) : (
          <ScrollView
            className="flex-col gap-y-[12px] w-full mt-[2px]"
            showsVerticalScrollIndicator={false}
          >
            {unboughtItems.length > 0 && (
              <ListItems
                title={i18n.t('general.products')}
                options={getOptions(unboughtItems)}
                handleOptionSelect={(option) => handleOptionSelect(option, 'unbought')}
              />
            )}

            {customItems.length > 0 && (
              <ListItems
                title={i18n.t('general.additional')}
                options={getOptions(customItems)}
                handleOptionSelect={(option) => handleOptionSelect(option, 'custom')}
              />
            )}

            {boughtItems.length > 0 && (
              <ListItems
                title={i18n.t('general.bought')}
                options={getOptions(boughtItems)}
                handleOptionSelect={(option) => handleOptionSelect(option, 'bought')}
                isChecked
              />
            )}
          </ScrollView>
        )}
      </View>
    </ScreenContainer>
  );
};

export default ShopList;
