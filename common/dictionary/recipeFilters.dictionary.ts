import { TypeOption } from '@/common/types';
import i18n from '@/i18n';

export const generalOptions: TypeOption[] = [
  { label: i18n.t('recipe-search.filters.general-options.in-the-field'), value: '1' },
  { label: i18n.t('recipe-search.filters.general-options.quick-cooking'), value: '2' },
  { label: i18n.t('recipe-search.filters.general-options.calories'), value: '3' },
  { label: i18n.t('recipe-search.filters.general-options.at-the-campfire'), value: '4' },
  { label: i18n.t('recipe-search.filters.general-options.long-term-storage'), value: '5' },
  { label: i18n.t('recipe-search.filters.general-options.no-kitchen-inheritance'), value: '6' }
];

export const recipeAuthors: TypeOption[] = [
  { label: i18n.t('recipe-search.filters.recipe-authors.from-the-app'), value: '1' },
  { label: i18n.t('recipe-search.filters.recipe-authors.from-the-users'), value: '2' }
];

export const ingredientAmountsOptions: TypeOption[] = [
  { label: i18n.t('recipe-search.filters.amount-of-ingredients-options.less-than-5'), value: '1' },
  { label: i18n.t('recipe-search.filters.amount-of-ingredients-options.5-10'), value: '2' },
  { label: i18n.t('recipe-search.filters.amount-of-ingredients-options.more-than-10'), value: '3' }
];

export const cookingTimeOptions: TypeOption[] = [
  { label: i18n.t('recipe-search.filters.cooking-time-options.less-than-15-minutes'), value: '1' },
  { label: i18n.t('recipe-search.filters.cooking-time-options.15-30-minutes'), value: '2' },
  { label: i18n.t('recipe-search.filters.cooking-time-options.30-60-minutes'), value: '3' },
  { label: i18n.t('recipe-search.filters.cooking-time-options.more-than-60-minutes'), value: '4' }
];

export const CalorieContentOptions: TypeOption[] = [
  { label: i18n.t('recipe-search.filters.calories-options.less-than-100'), value: '1' },
  { label: i18n.t('recipe-search.filters.calories-options.100-200'), value: '2' },
  { label: i18n.t('recipe-search.filters.calories-options.200-500'), value: '3' },
  { label: i18n.t('recipe-search.filters.calories-options.more-than-500'), value: '4' }
];

export const TagsOptions: TypeOption[] = [
  { label: 'Гриль', value: '1' },
  { label: 'Вегетаріанське', value: '2' },
  { label: 'Швидкій обід', value: '3' },
  { label: 'Нові рецепти', value: '4' }
];
