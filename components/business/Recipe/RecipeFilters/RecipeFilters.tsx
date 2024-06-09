import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { defaultRecipeFilters } from '@/common/dictionary';
import { useModal } from '@/common/hooks';
import { SearchParam } from '@/common/interfaces';
import { RecipeFiltersType } from '@/common/types';
import { countSelectedFilters } from '@/common/utils';
import { RecipeFiltersModal } from '@/components/business/Recipe/RecipeFiltersModal';
import { FilterButton } from '@/components/ui/FilterButton';
import { SearchInput } from '@/components/ui/SearchInput';
import i18n from '@/i18n';

interface RecipeFiltersProps {
  extraStyles?: string;
  setSelectedNewFilters?: (filters: RecipeFiltersType & SearchParam) => void;
  setFiltersCount?: (count: number) => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  extraStyles,
  setFiltersCount,
  setSelectedNewFilters
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<RecipeFiltersType>(defaultRecipeFilters);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);

  const [isRecipeFiltersModalVisible, showRecipeFiltersModal, hideRecipeFiltersModal] = useModal();
  const [debouncedSearchText] = useDebounce(searchText, 1000);

  useEffect(() => {
    const count = countSelectedFilters(selectedFilters);
    setSelectedFiltersCount(count);

    setFiltersCount && setFiltersCount(count);
    setSelectedNewFilters &&
      setSelectedNewFilters({ ...selectedFilters, searchQuery: debouncedSearchText });
  }, [selectedFilters, debouncedSearchText]);

  return (
    <>
      <View className={extraStyles}>
        <View className="mr-[10px] flex-1">
          <SearchInput
            placeholder={i18n.t('recipe-search.search-placeholder')}
            maxLength={30}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <FilterButton onPress={showRecipeFiltersModal} amountOfFilters={selectedFiltersCount} />
      </View>

      <RecipeFiltersModal
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        selectedFiltersCount={selectedFiltersCount}
        isModalVisible={isRecipeFiltersModalVisible}
        hideModal={hideRecipeFiltersModal}
      />
    </>
  );
};

export default RecipeFilters;
