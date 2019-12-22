import React from 'react';

import { Button, Form } from '../../components';
import { RegisterPageProps } from './types';
import './styles.scss';

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <div className="register-page">
      <Form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Form.Group flexDirection="column">
          <Form.Input inputId="register-email" type="email" label="Email" />
          <Form.Input
            inputId="register-username"
            type="text"
            label="Username"
          />
          <Form.Input
            inputId="register-password"
            type="password"
            label="Password"
          />
        </Form.Group>
        <Button type="submit" text="Register" />
      </Form>
    </div>
  );
};

export default RegisterPage;
