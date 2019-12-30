import React, { useState } from 'react';

import { Button, Form } from '../../components';
import { LoginPageProps, User, UserErrors } from './types';
import sendRequest from '../../api';
import './styles.scss';

const LoginPage: React.FC<LoginPageProps> = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserErrors>({
    email: [],
    password: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendRequest({
        method: 'POST',
        url: '/auth/login',
        data: {
          ...user,
        },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log('handleSubmit error: ', err);

      setErrors({
        email: err.response.data.error,
        password: err.response.data.error,
      });
    }
  };

  return (
    <div className="login-page">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" flexDirection="column">
          <Form.Input
            className="form-input"
            onChange={handleChange}
            inputId="email"
            type="email"
            label="email"
            value={user.email}
            error={errors.email}
          />
          <Form.Input
            className="form-input"
            onChange={handleChange}
            inputId="password"
            type="password"
            label="password"
            value={user.password}
            error={errors.password}
          />
        </Form.Group>
        <Button type="submit" text="Register" />
      </Form>
    </div>
  );
};

export default LoginPage;
