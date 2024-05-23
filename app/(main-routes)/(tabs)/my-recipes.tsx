import React, { useState } from 'react';
import { View } from 'react-native';

import BlockInsteadOfRecipe from '../../../components/ui/BlockInsteadOfRecipe/BlockInsteadOfRecipe';

import { useModal } from '@/common/hooks';
import { CreateRecipeModal } from '@/components/business/MyRecipes';
import Button from '@/components/ui/Button';
import ScreenContainer from '@/components/ui/ScreenContainer';
import { SearchInput } from '@/components/ui/SearchInput';
import TabTitle from '@/components/ui/TabTitle';
import i18n from '@/i18n';

const MyRecipes: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const [isCreateModalVisible, showCreateModal, hideCreateModal] = useModal();

  return (
    <>
      <ScreenContainer isTouchableWithoutFeedback>
        <View className="mx-4">
          <TabTitle title={i18n.t('my-recipes.tab-title')} extraTitleStyles="w-[240px]" />

          <View className="mt-[6px]">
            <SearchInput
              placeholder={i18n.t('recipe-search.search-placeholder')}
              maxLength={30}
              value={searchText}
              onChangeText={setSearchText}
            />

            <Button
              label={i18n.t('my-recipes.create-recipe-button')}
              type="outlined"
              borderRadius="border-0"
              extraStyles="mt-2"
              onPress={showCreateModal}
            />
          </View>

          <BlockInsteadOfRecipe title={i18n.t('my-recipes.not-have-any-recipes')} />
        </View>
      </ScreenContainer>

      <CreateRecipeModal hideModal={hideCreateModal} isModalVisible={isCreateModalVisible} />
    </>
  );
};

export default MyRecipes;
