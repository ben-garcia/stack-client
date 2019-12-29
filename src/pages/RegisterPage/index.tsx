import React, { useState } from 'react';

import { Button, Form } from '../../components';
import { RegisterPageProps, User, UserErrors } from './types';
import { emailSchema, usernameSchema, passwordSchema } from './utils';
import sendRequest from '../../api';
import './styles.scss';

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserErrors>({
    email: [],
    username: [],
    password: [],
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);

  /**
   *
   * @param targetName name of the target
   *
   * returns all errors when validating
   */
  const validateField = async (targetName: string) => {
    try {
      if (targetName === 'email') {
        await emailSchema.validate(user.email, { abortEarly: false });
      } else if (targetName === 'username') {
        await usernameSchema.validate(user.username, { abortEarly: false });
      } else if (targetName === 'password') {
        await passwordSchema.validate(user.password, { abortEarly: false });
      }
    } catch (err) {
      if (targetName === 'email') {
        setErrors({
          ...errors,
          email: [...err.errors],
        });
      } else if (targetName === 'username') {
        setErrors({
          ...errors,
          username: [...err.errors],
        });
      } else if (targetName === 'password') {
        setErrors({
          ...errors,
          password: [...err.errors],
        });
      }
    }
  };

  /**
   *
   * @param targetName e.target.name
   *
   * @return true if input in valid,
   * false if input is not valid, or null otherwise
   *
   */
  const isFieldValid = (targetName: string) => {
    if (targetName === 'email') {
      return emailSchema.isValidSync(user.email);
    }
    if (targetName === 'username') {
      return usernameSchema.isValidSync(user.username);
    }
    if (targetName === 'password') {
      return passwordSchema.isValidSync(user.password);
    }
    return null;
  };

  /**
   *
   * @param e React.ChangeEvent<HTMLInputElement>
   *
   * update state
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if there are any errors, then submit button must be disabled
    if (
      errors.email.length > 0 ||
      errors.username.length > 0 ||
      errors.password.length > 0
    ) {
      setButtonIsDisabled(true);
    }

    if (
      isFieldValid('email') &&
      isFieldValid('username') &&
      isFieldValid('password')
    ) {
      setErrors({
        email: [],
        username: [],
        password: [],
      });
      setButtonIsDisabled(false);
    }

    if (e.target.name === 'email') {
      setUser({
        ...user,
        email: e.target.value,
      });
      if (isFieldValid('email')) {
        setErrors({
          ...errors,
          email: [],
        });
      } else {
        validateField('email');
      }
    } else if (e.target.name === 'username') {
      setUser({
        ...user,
        username: e.target.value,
      });
      if (isFieldValid('username')) {
        setErrors({
          ...errors,
          username: [],
        });
      } else {
        validateField('username');
      }
    } else if (e.target.name === 'password') {
      setUser({
        ...user,
        password: e.target.value,
      });
      if (isFieldValid('password')) {
        setErrors({
          ...errors,
          password: [],
        });
      } else {
        validateField('password');
      }
    }
  };

  /**
   *
   * @param e FocusEvent<HTMLInputElement>
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    validateField(e.target.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // disable the button
      setButtonIsDisabled(true);

      await validateField(user.email);
      await validateField(user.username);
      await validateField(user.password);

      let response;

      if (!buttonIsDisabled) {
        response = await sendRequest({
          method: 'POST',
          url: '/auth/register',
          data: {
            ...user,
          },
        });
      }

      // eslint-disable-next-line
      console.log('response: ', response);
    } catch (err) {
      // eslint-disable-next-line
      console.log('handleSubmit error: ', err);
    }
  };

  return (
    <div className="register-page">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" flexDirection="column">
          <Form.Input
            className="form-input"
            onChange={handleChange}
            onBlur={handleBlur}
            inputId="email"
            type="email"
            label="email"
            value={user.email}
            error={errors.email}
          />
          <Form.Input
            className="form-input"
            onChange={handleChange}
            onBlur={handleBlur}
            inputId="username"
            type="text"
            label="username"
            value={user.username}
            error={errors.username}
          />
          <Form.Input
            className="form-input"
            onChange={handleChange}
            onBlur={handleBlur}
            inputId="password"
            type="password"
            label="password"
            value={user.password}
            error={errors.password}
          />
        </Form.Group>
        <Button type="submit" text="Register" disabled={buttonIsDisabled} />
      </Form>
    </div>
  );
};

export default RegisterPage;
