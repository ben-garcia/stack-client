import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .trim()
  .email()
  .required();

export const usernameSchema = yup
  .string()
  .trim()
  .min(3)
  .required();

export const passwordSchema = yup
  .string()
  .trim()
  .min(6)
  .required();

export const newUserSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});
