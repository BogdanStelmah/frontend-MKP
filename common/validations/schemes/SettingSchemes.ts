import * as yup from 'yup';

import { fields } from '@/common/validations/fields';

export const changeAppPersonalization = yup.object().shape({
  theme: fields.theme,
  language: fields.language
});
