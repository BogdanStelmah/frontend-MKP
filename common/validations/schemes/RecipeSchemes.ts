import * as yup from 'yup';

import { fields } from '@/common/validations';

export const createRecipeScheme = yup.object().shape({
  imageUri: fields.imageUri
});
