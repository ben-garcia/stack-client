import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import FormGroup from './FormGroup';

storiesOf('Form', module)
  .add('default', () => (
    <Form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
    </Form>
  ))
  .add('with FormGroup', () => (
    <FormGroup>
      <input />
      <input />
    </FormGroup>
  ));
