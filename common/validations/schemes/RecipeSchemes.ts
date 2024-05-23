import * as yup from 'yup';

import { fields, IS_REQUIRED } from '@/common/validations/fields';

export const createRecipeScheme = yup.object().shape({
  imageUri: fields.imageUri,

  title: yup.string().required(IS_REQUIRED).trim().min(2).max(50),

  description: yup.string().optional().trim().min(2).max(255),

  cookingInstructions: yup.string().required(IS_REQUIRED).trim().min(2).max(2000)

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
