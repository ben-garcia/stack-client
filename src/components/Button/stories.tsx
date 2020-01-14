import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '..';

storiesOf('Button', module)
  .add('default', () => <Button type="button">Button</Button>)
  .add('with onClick', () => (
    <Button type="button" onClick={action('click')}>
      Button
    </Button>
  ))
  .add('with tranparent color', () => (
    <Button type="button" color="transparent">
      Button
    </Button>
  ));
