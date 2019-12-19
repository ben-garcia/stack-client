import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '.';
import RegisterPage from '../../pages/RegisterPage';

storiesOf('Modal', module)
  .add('default', () => (
    <Modal open header="Modal Header">
      Modal Example
    </Modal>
  ))
  .add('with RegisterPage', () => (
    <Modal open header="Register">
      <RegisterPage />
    </Modal>
  ));
