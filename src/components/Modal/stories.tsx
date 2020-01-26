import React from 'react';
import { storiesOf } from '@storybook/react';

import { RegisterPage } from 'pages';
import Modal from '.';

storiesOf('Modal', module)
  .add('sm', () => (
    <Modal size="sm" header="Modal">
      This is a small Modal
    </Modal>
  ))
  .add('md', () => (
    <Modal size="md" header="Modal">
      This is a medium Modal
    </Modal>
  ))
  .add('lg', () => (
    <Modal size="lg" header="Modal">
      This is a large Modal
    </Modal>
  ))
  .add('fullscreen', () => (
    <Modal size="fullscreen" header="Modal">
      This is a fullscreen Modal
    </Modal>
  ))
  .add('transparent background', () => (
    <Modal header="Modal" background={false}>
      This is a Modal without dark background
    </Modal>
  ))
  .add('with RegisterPage', () => (
    <Modal header="Register">
      <RegisterPage
        setLoginModalIsOpen={() => {}}
        setRegisterModalIsOpen={() => {}}
      />
    </Modal>
  ));
