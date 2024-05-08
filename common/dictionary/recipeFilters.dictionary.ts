import { UsersTypeEnum } from '@/common/enums';
import { TypeOption } from '@/common/types';
import i18n from '@/i18n';

export const getGeneralOptions = (): TypeOption[] => [
  { label: i18n.t('recipe-search.filters.general-options.in-the-field'), value: '1' },
  { label: i18n.t('recipe-search.filters.general-options.quick-cooking'), value: '2' },
  { label: i18n.t('recipe-search.filters.general-options.calories'), value: '3' },
  { label: i18n.t('recipe-search.filters.general-options.at-the-campfire'), value: '4' },
  { label: i18n.t('recipe-search.filters.general-options.long-term-storage'), value: '5' },
  { label: i18n.t('recipe-search.filters.general-options.no-kitchen-inheritance'), value: '6' }
];

export const getRecipeAuthors = (): TypeOption[] => [
  { label: i18n.t('recipe-search.filters.recipe-authors.from-the-app'), value: UsersTypeEnum.MKP },
  {
    label: i18n.t('recipe-search.filters.recipe-authors.from-the-users'),
    value: UsersTypeEnum.USER
  }
];

export const getCookingTimeOptions = (): TypeOption[] => [
  {
    label: i18n.t('recipe-search.filters.cooking-time-options.less-than-15-minutes'),
    value: [0, 15]
  },
  { label: i18n.t('recipe-search.filters.cooking-time-options.15-30-minutes'), value: [15, 30] },
  { label: i18n.t('recipe-search.filters.cooking-time-options.30-60-minutes'), value: [30, 60] },
  {
    label: i18n.t('recipe-search.filters.cooking-time-options.more-than-60-minutes'),
    value: [60, 0]
  }
];

export const getCalorieContentOptions = (): TypeOption[] => [
  { label: i18n.t('recipe-search.filters.calories-options.less-than-100'), value: [0, 100] },
  { label: i18n.t('recipe-search.filters.calories-options.100-200'), value: [100, 200] },
  { label: i18n.t('recipe-search.filters.calories-options.200-500'), value: [200, 500] },
  { label: i18n.t('recipe-search.filters.calories-options.more-than-500'), value: [500, 0] }
];

export const getTagsOptions = (): TypeOption[] => [
  { label: 'Гриль', value: '1' },
  { label: 'Вегетаріанське', value: '2' },
  { label: 'Швидкій обід', value: '2' },
  { label: 'Нові рецепти', value: '3' }
];

export const defaultRecipeFilters = {
  general: undefined,
  cookingTime: undefined,
  calories: undefined,
  tags: undefined,
  recipeAuthors: []
};
