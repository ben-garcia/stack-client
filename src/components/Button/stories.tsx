import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '..';

storiesOf('Button', module)
  .add('with primary', () => (
    <Button type="button" onClick={action('click')}>
      Button
    </Button>
  ))
  .add('with tranparent', () => (
    <Button type="button" color="transparent">
      Button
    </Button>
  ));
