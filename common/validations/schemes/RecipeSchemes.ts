import * as yup from 'yup';

import { fields, IS_REQUIRED } from '@/common/validations/fields';

export const addIngredientScheme = yup.object().shape({
  nameIngredient: yup.string().required(IS_REQUIRED).trim().max(50),

  quantity: yup.number().optional().min(0),

  unitOfMeasure: yup.string().required(IS_REQUIRED).trim().min(1).max(20),

  comment: yup.string().optional().trim().max(50)
});

export const createRecipeScheme = yup.object().shape({
  imageUri: fields.imageUri,

  title: yup.string().required(IS_REQUIRED).trim().min(2).max(50),

  description: yup.string().optional().trim().min(2).max(255),

  cookingInstructions: yup.string().required(IS_REQUIRED).trim().min(2).max(2000),

  ingredients: yup.array().of(addIngredientScheme).min(1).required(IS_REQUIRED)

  // calorieContent: yup.number().required(IS_REQUIRED).min(1),
  //
  // weight: yup.number().required(IS_REQUIRED).min(1),
  //
  // numberOfServings: yup.number().required(IS_REQUIRED).min(1),
  //
  // protein: yup.number().optional().min(1),
  //
  // fat: yup.number().optional().min(1),
  //
  // carbohydrates: yup.number().optional().min(0),
  //
  // cookingTime: yup.number().required(IS_REQUIRED).min(1)
});
