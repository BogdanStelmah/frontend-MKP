import * as yup from 'yup';

import { LangEnum, ThemeEnum } from '@/common/enums';
import { GenderEnum } from '@/common/enums/gender.enum';
import { GenderOption, LangOption, ThemeOption } from '@/common/types';
import i18n from '@/i18n';

export const IS_REQUIRED = i18n.t('validations.please-complete-this-required-field');

export const onlyLatinLettersRegex = /^[\x00-\x7F]*[A-Za-z]+[\x00-\x7F]*$/;
export const onlyLettersHyphensAndSingleQuotes = /^[^\d!"#$%&()*+,./:;<=>?@[\\\]^_{|}~]*$/;

export const fields = {
  email: yup
    .string()
    .email(i18n.t('validations.invalid-email-format') as string)
    .required(IS_REQUIRED)
    .test(
      'len',
      i18n.t('validations.email-cannot-be-longer', { number: '253' }) as string,
      (val) => val !== undefined && val.toString().length <= 253
    )
    .matches(/^[^!+&#"(),:;/<>[\]\\]*$/, i18n.t('validations.invalid-email-format') as string)
    .matches(onlyLatinLettersRegex, i18n.t('validations.email-must-contain-only') as string)
    .test('double-hyphen', i18n.t('validations.invalid-email-format') as string, (val) => {
      return val !== undefined && !val.includes('--');
    })
    .test('underscore', i18n.t('validations.invalid-email-format') as string, (val) => {
      return val !== undefined && !val.split('@')[1]?.includes('_');
    }),

  firstName: yup
    .string()
    .required(IS_REQUIRED)
    .trim()
    .test(
      'len',
      i18n.t('validations.first-name-cannot-be-longer', { number: '32' }) as string,
      (val) => val !== undefined && val.toString().length <= 32
    )
    .matches(
      onlyLettersHyphensAndSingleQuotes,
      i18n.t('validations.first-name-can-contain-only') as string
    ),

  lastName: yup
    .string()
    .required(IS_REQUIRED)
    .trim()
    .test(
      'len',
      i18n.t('validations.last-name-cannot-be-longer', { number: '32' }) as string,
      (val) => val !== undefined && val.toString().length <= 32
    )
    .matches(
      onlyLettersHyphensAndSingleQuotes,
      i18n.t('validations.last-name-can-contain-only') as string
    ),

  loginPassword: yup.string().required(IS_REQUIRED),

  password: yup
    .string()
    .required(i18n.t('validations.password-is-required') as string)
    .min(
      8,
      i18n.t('validations.password-must-be-at-least-characters-long', { number: '8' }) as string
    )
    .matches(
      /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
      i18n.t('validations.password-must-contain-at-least-one-special-symbol') as string
    )
    .matches(
      /^.*[0-9].*$/,
      i18n.t('validations.password-must-contain-at-least-one-number') as string
    )
    .matches(
      /^[\x00-\x7F]*[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+[\x00-\x7F]*$/,
      i18n.t('validations.password-must-contain-only') as string
    ),

  confirmPassword: yup
    .string()
    .required(i18n.t('validations.confirm-password-is-required') as string)
    .oneOf([yup.ref('password'), ''], i18n.t('validations.passwords-must-match') as string),

  code: yup
    .string()
    .required(i18n.t('validations.code-is-required'))
    .length(6, i18n.t('validations.code-must-be-6-digits-long'))
    .matches(/^[0-9]+$/, i18n.t('validations.code-must-contain-only-numbers')),

  gender: yup.object<GenderOption>().shape({
    label: yup.string().required(),
    value: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)).required()
  }),

  theme: yup.object<ThemeOption>().shape({
    label: yup.string().required(),
    value: yup.mixed<ThemeEnum>().oneOf(Object.values(ThemeEnum)).required()
  }),

  language: yup.object<LangOption>().shape({
    label: yup.string().required(),
    value: yup.mixed<LangEnum>().oneOf(Object.values(LangEnum)).required()
  }),

  imageUri: yup.string().required(IS_REQUIRED)
};
