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
        <Form.Input type="text" inputId="full-name" label="Full Name" />
        <Form.Input type="email" inputId="email" label="Email" />
        <Form.Input type="password" inputId="password" label="Password" />
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
        <Form.Input inputId="name" type="text" label="Name" />
        <Form.Input inputId="password" type="password" label="Password" />
      </Form.Group>
      <Button type="submit" text="Submit" />
    </Form>
  ));
