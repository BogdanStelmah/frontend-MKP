import * as yup from 'yup';

import { fields } from '@/common/validations/fields';

export const signInSchema = yup.object().shape({
  email: fields.email,
  password: fields.loginPassword
});

export const registrationScheme = yup.object().shape({
  email: fields.email,
  password: fields.password,
  confirmPassword: fields.confirmPassword
});

export const forgotPasswordScheme = yup.object().shape({
  email: fields.email
});

export const changePasswordScheme = yup.object().shape({
  password: fields.password,
  confirmPassword: fields.confirmPassword
});

export const codeVerificationScheme = yup.object().shape({
  code: fields.code
});

export const partnerPersonalDetails = yup.object().shape({
  firstName: fields.firstName,
  lastName: fields.lastName
});
