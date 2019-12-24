import React, { useState } from 'react';

import { Button, Form } from '../../components';
import { RegisterPageProps } from './types';
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  newUserSchema,
} from './utils';
import './styles.scss';

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string[]>([]);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string[]>([]);
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
        await emailSchema.validate(email, { abortEarly: false });
      } else if (targetName === 'username') {
        await usernameSchema.validate(username, { abortEarly: false });
      } else if (targetName === 'password') {
        await passwordSchema.validate(password, { abortEarly: false });
      }
    } catch (err) {
      if (targetName === 'email') {
        setEmailError([...err.errors]);
      } else if (targetName === 'username') {
        setUsernameError([...err.errors]);
      } else if (targetName === 'password') {
        setPasswordError([...err.errors]);
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
      return emailSchema.isValidSync(email);
    }
    if (targetName === 'username') {
      return usernameSchema.isValidSync(username);
    }
    if (targetName === 'password') {
      return passwordSchema.isValidSync(password);
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
    if (
      isFieldValid('email') &&
      isFieldValid('username') &&
      isFieldValid('password')
    ) {
      setEmailError([]);
      setUsernameError([]);
      setPasswordError([]);
      setButtonIsDisabled(false);
    }

    if (e.target.name === 'email') {
      setEmail(e.target.value);
      if (isFieldValid('email')) {
        setEmailError([]);
      } else {
        validateField('email');
      }
    } else if (e.target.name === 'username') {
      setUsername(e.target.value);
      if (isFieldValid('username')) {
        setUsernameError([]);
      } else {
        validateField('username');
      }
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
      if (isFieldValid('password')) {
        setPasswordError([]);
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
      await newUserSchema.isValid({
        email,
        username,
        password,
      });
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
            value={email}
            error={emailError}
          />
          <Form.Input
            className="form-input"
            onChange={handleChange}
            onBlur={handleBlur}
            inputId="username"
            type="text"
            label="username"
            value={username}
            error={usernameError}
          />
          <Form.Input
            className="form-input"
            onChange={handleChange}
            onBlur={handleBlur}
            inputId="password"
            type="password"
            label="password"
            value={password}
            error={passwordError}
          />
        </Form.Group>
        <Button type="submit" text="Register" disabled={buttonIsDisabled} />
      </Form>
    </div>
  );
};

export default RegisterPage;
