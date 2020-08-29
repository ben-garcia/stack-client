import React, { useState } from 'react';

import { Button, Form, Icon, Text } from 'components';
import { sendRequest } from 'api';
import { RegisterPageProps, User, UserErrors } from './types';
import { emailSchema, usernameSchema, passwordSchema } from './utils';
import './styles.scss';

const RegisterPage: React.FC<RegisterPageProps> = ({
  setRegisterModalIsOpen,
  setLoginModalIsOpen,
}) => {
  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserErrors>({
    email: [],
    username: [],
    password: [],
    response: [],
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      setIsSubmitting(false);
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
        response: [],
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

    if (errors.response.length > 0) {
      setErrors({
        email: [],
        username: [],
        password: [],
        response: [],
      });
    }

    try {
      // disable the button
      setButtonIsDisabled(true);
      // show loading spinner icon
      setIsSubmitting(true);

      await validateField(user.email);
      await validateField(user.username);
      await validateField(user.password);

      if (!buttonIsDisabled) {
        await sendRequest({
          method: 'POST',
          url: '/auth/register',
          data: {
            ...user,
          },
        });

        // close the register modal and show the login modal
        setRegisterModalIsOpen(false);
        setLoginModalIsOpen(true);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log('handleSubmit error: ', { err });

      if (err.response) {
        if (typeof err.response.data.error !== 'string') {
          setErrors({
            email: [],
            username: [],
            password: [],
            response: [...err.response.data.error],
          });
        } else {
          setErrors({
            email: [],
            username: [],
            password: [],
            response: [err.response.data.error],
          });
        }
      } else {
        setErrors({
          email: [],
          username: [],
          password: [],
          response: [err.message],
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      {errors.response.length > 0 && (
        <div className="register-page__error">
          {errors.response.map((err: string) => (
            <Text key={err}>{err}</Text>
          ))}
        </div>
      )}
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
        <Button
          color="transparent"
          className="register-page__test-account-button"
          onClick={() => {
            setRegisterModalIsOpen(false);
            setLoginModalIsOpen(true);
          }}
          type="button"
        >
          Login using a test account!
        </Button>
        <Button type="submit" disabled={buttonIsDisabled && !isSubmitting}>
          {isSubmitting ? (
            <Icon color="white" isLoading size="sm" type="spinner" />
          ) : (
            <Text tag="span">Register</Text>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
