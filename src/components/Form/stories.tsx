import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';

storiesOf('Form', module)
  .add('default', () => (
    <Form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
    </Form>
  ))
  .add('with FormGroup', () => (
    <Form>
      <Form.Group>
        <input />
        <input />
      </Form.Group>
    </Form>
  ))
  .add('with FormInput', () => (
    <Form>
      <Form.Group>
        <Form.Input type="text" label="Full Name" />
        <Form.Input type="email" label="Email" />
        <Form.Input type="password" label="Password" />
      </Form.Group>
    </Form>
  ));
