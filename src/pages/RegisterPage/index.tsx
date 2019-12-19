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
          <Form.Input type="email" label="Email" />
          <Form.Input type="text" label="Username" />
          <Form.Input type="password" label="Password" />
        </Form.Group>
        <Button type="submit" text="Register" />
      </Form>
    </div>
  );
};

export default RegisterPage;
