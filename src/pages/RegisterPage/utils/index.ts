import * as yup from 'yup';

import { User } from '../types';

export const emailSchema: yup.StringSchema<string> = yup
  .string()
  .email()
  .required();

export const usernameSchema: yup.StringSchema<string> = yup
  .string()
  .trim()
  .min(5, 'minumum length of 6')
  .required();

export const passwordSchema: yup.StringSchema<string> = yup
  .string()
  .trim()
  .min(5, 'minumum length of 6')
  .required();

export const newUserSchema: yup.ObjectSchema<User> = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});
