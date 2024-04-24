import React, { useState } from 'react';
import { View } from 'react-native';

import BlockInsteadOfRecipe from '../../../components/ui/BlockInsteadOfRecipe/BlockInsteadOfRecipe';

import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';

const MyRecipes: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="mx-4">
        <TabTitle title="Тут відображаються ваші рецепти" extraTitleStyles="w-[240px]" />

        <View className="mt-[6px]">
          <SearchInput
            placeholder={i18n.t('recipe-search.search-placeholder')}
            maxLength={30}
            value={searchText}
            onChangeText={setSearchText}
          />

          <Button
            label="Створити рецепт"
            type="outlined"
            borderRadius="border-0"
            extraStyles="mt-2"
          />
        </View>

        <BlockInsteadOfRecipe title="У вас ще немає рецептів" />
      </View>
    </ScreenContainer>
  );
};

export default MyRecipes;
