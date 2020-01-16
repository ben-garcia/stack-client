import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import { Button } from '..';

storiesOf('Form', module).add('with Checkbox, Input', () => (
  <div style={{ width: '50vw', margin: '0 auto' }}>
    <Form>
      <Form.Group>
        <Form.Input type="text" inputId="full-name" label="Full Name" />
        <Form.Input type="email" inputId="email" label="Email" />
        <Form.Input type="password" inputId="password" label="Password" />
        <Form.Checkbox inputId="public" label="Make Public" />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  </div>
));
