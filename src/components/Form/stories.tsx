import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import { Button } from '..';

storiesOf('Form', module)
  .add('default', () => <Form />)
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
  ))
  .add('with onSubmit', () => (
    <Form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Form.Group>
        <Form.Input type="text" label="Name" />
        <Form.Input type="password" label="Password" />
      </Form.Group>
      <Button type="submit" text="Submit" />
    </Form>
  ));
