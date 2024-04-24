import { TypeOption } from '@/common/types';

export const generalOptions: TypeOption[] = [
  { label: 'В польових умовах', value: '1' },
  { label: 'Швидке приготування', value: '2' },
  { label: 'Калорійні', value: '3' },
  { label: 'На вогнищі', value: '4' },
  { label: 'Довготривале зберігання', value: '5' },
  { label: 'Без кухонного успадкування', value: '6' }
];

export const recipeAuthors: TypeOption[] = [
  { label: 'Від додатку', value: '1' },
  { label: 'Від користувачів', value: '2' }
];

export const ingredientAmountsOptions: TypeOption[] = [
  { label: 'Менше 5', value: '1' },
  { label: 'Від 5 до 10', value: '2' },
  { label: 'Більше 10', value: '3' }
];

export const cookingTimeOptions: TypeOption[] = [
  { label: 'Менше 15 хв', value: '1' },
  { label: 'Від 15 до 30 хв', value: '2' },
  { label: 'Більше 30 хв', value: '3' }
];

export const CalorieContentOptions: TypeOption[] = [
  { label: 'Менше 200 ккал', value: '1' },
  { label: 'Від 200 до 500 ккал', value: '2' },
  { label: 'Більше 500 ккал', value: '3' }
];

export const TagsOptions: TypeOption[] = [
  { label: 'Гриль', value: '1' },
  { label: 'Вегетаріанське', value: '2' },
  { label: 'Швидкій обід', value: '3' },
  { label: 'Нові рецепти', value: '4' }
];
