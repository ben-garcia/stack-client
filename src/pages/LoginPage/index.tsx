import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import sendRequest from 'api';
import { Button, Form } from 'components';
import userLoggedIn from 'store/user/actions';
import { User as StoreUser } from 'store/user/types';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { LoginPageProps, User, UserErrors } from './types';
import './styles.scss';

const LoginPage: React.FC<LoginPageProps> = ({
  userLoggedInAction,
  requestUserWorkspacesAction,
}) => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserErrors>({
    email: [],
    password: [],
  });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      userLoggedInAction(response.data.user);

      // dispatch the action to get user's workspaces
      requestUserWorkspacesAction();

      // when a successfull response from the server
      // redirect to dashboard
      history.replace('/dashboard');
    } catch (err) {
      // eslint-disable-next-line
      console.log('handleSubmit error: ', err);

      setErrors({
        email: err.response?.data.error,
        password: err.response?.data.error,
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
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: StoreUser) => dispatch(userLoggedIn(user)),
  requestUserWorkspacesAction: () => dispatch(requestUserWorkspaces()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
