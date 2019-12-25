import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .email()
  .required();

export const usernameSchema = yup
  .string()
  .trim()
  .min(2, 'field must contain a minumun length of 3')
  .required();

export const passwordSchema = yup
  .string()
  .trim()
  .min(5, 'field must contain a minumum length of 6')
  .required();

export const newUserSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});
