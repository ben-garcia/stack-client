import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '.';
import RegisterPage from '../../pages/RegisterPage';

storiesOf('Modal', module)
  .add('default', () => <Modal header="Modal Header">Modal Example</Modal>)
  .add('with RegisterPage', () => (
    <Modal header="Register">
      <RegisterPage />
    </Modal>
  ));
