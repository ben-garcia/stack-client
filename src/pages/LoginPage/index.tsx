import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { sendRequest } from 'api';
import { Button, Form } from 'components';
import { userLoggedIn } from 'store/user';
import { requestUserWorkspaces } from 'store/workspaces';
import { LoginPageProps, User, UserErrors } from './types';
import './styles.scss';

const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch: Dispatch = useDispatch();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserErrors>({
    email: [],
    password: [],
    response: [],
  });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page reload
    e.preventDefault();

    if (user.email.length < 6) {
      // set the email error
      setErrors(previousState => ({
        ...previousState,
        email: ['Email must be at least 6 characters long'],
      }));
    }

    if (user.password.length < 6) {
      // set the password error
      setErrors(previousState => ({
        ...previousState,
        password: ['Password must be at least 6 characters long'],
      }));
    }

    if (errors.email.length > 0 && user.email.length >= 6) {
      // reset email error message
      setErrors({
        ...errors,
        email: [],
      });
    }

    if (errors.password.length > 0 && user.password.length >= 6) {
      // reset password error message
      setErrors({
        ...errors,
        password: [],
      });
    }

    // send the request when length requirements have been met
    if (user.email.length >= 6 && user.password.length >= 6) {
      try {
        const response = await sendRequest({
          method: 'POST',
          url: '/auth/login',
          data: {
            ...user,
          },
        });

        // save user to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // dispatch the action to update the user.isLoggedIn
        dispatch(userLoggedIn(response.data.user));

        // dispatch the action to get user's workspaces
        dispatch(requestUserWorkspaces());

        // when a successfull response from the server
        // redirect to dashboard
        history.replace('/dashboard');
      } catch (err) {
        // eslint-disable-next-line
        console.log('handleSubmit error: ', err);
        setErrors({
          email: [],
          password: [],
          response: ['There is no user with that email/password combination'],
        });
      }
    }
  };

  return (
    <div className="login-page">
      {errors.response.length > 0 && (
        <span className="login-page__error">{errors.response[0]}</span>
      )}
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
        <Button type="submit">Log In</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
