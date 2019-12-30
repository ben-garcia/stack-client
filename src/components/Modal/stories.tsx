import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '.';
import { RegisterPage, LoginPage } from '../../pages';

storiesOf('Modal', module)
  .add('default', () => <Modal header="Modal Header">Modal Example</Modal>)
  .add('with RegisterPage', () => (
    <Modal header="Register">
      <RegisterPage />
    </Modal>
  ))
  .add('with LoginPage', () => (
    <Modal header="Login">
      <LoginPage />
    </Modal>
  ));
