import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import { Button } from '..';

storiesOf('Form', module)
  .add('default', () => <Form />)
  .add('with FormGroup', () => (
    <Form>
      <Form.Group>
        <Form.Input type="text" inputId="full-name" label="Full Name" />
        <Form.Input type="email" inputId="email" label="Email" />
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
    <Form>
      <Form.Input inputId="name" type="text" label="Name" />
      <Form.Input inputId="password" type="password" label="Password" />
      <Button type="submit">Submit</Button>
    </Form>
  ))
  .add('with single error', () => (
    <Form>
      <Form.Input
        error="There was a single error"
        inputId="name"
        type="text"
        label="Name"
      />
    </Form>
  ))
  .add('with array of errors', () => (
    <Form>
      <Form.Input
        error={['There was an error', 'There was another error']}
        inputId="name"
        type="text"
        label="Name"
      />
    </Form>
  ));
