import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { sendRequest } from 'api';
import { Button, Form, Icon, Text } from 'components';
import { userLoggedIn } from 'store/user';
import { requestUserWorkspaces } from 'store/workspaces';
import { LoginPageProps, User, UserErrors } from './types';
import './styles.scss';

const LoginPage: React.FC<LoginPageProps> = ({
  setRegisterModalIsOpen,
  setLoginModalIsOpen,
}) => {
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
        setIsSubmitting(true);

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
        console.log('handleSubmit error: ', { err });
        if (err.response) {
          setErrors({
            email: [],
            password: [],
            response: [err.response.data.error],
          });
        } else {
          setErrors({
            email: [],
            password: [],
            response: [err.message],
          });
        }
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-page">
      {errors.response.length > 0 && (
        <div className="login-page__error">{errors.response[0]}</div>
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
        <Button
          color="transparent"
          className="login-page__need-account-button"
          onClick={() => {
            setLoginModalIsOpen(false);
            setRegisterModalIsOpen(true);
          }}
          type="button"
        >
          Dont have an account yet?
        </Button>
        <div className="login-page__testing-accounts">
          <div className="stackguest">
            <Text>Test Account 1</Text>
            <Text size="sm">email: stackguest@stack.com</Text>
            <Text size="sm">password: stackguest</Text>
          </div>
          <div className="stacktestuser">
            <Text>Test Account 2</Text>
            <Text size="sm">email: stacktestuser@stack.com</Text>
            <Text size="sm">password: stacktestuser</Text>
          </div>
        </div>
        <Button type="submit">
          {isSubmitting ? (
            <Icon color="white" isLoading size="sm" type="spinner" />
          ) : (
            <Text>Log In</Text>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
