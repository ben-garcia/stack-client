import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '.';

storiesOf('Button', module)
  .add('default', () => <Button text="Button" onClick={action('click')} />)
  .add('with tranparent color', () => (
    <Button text="Button" color="transparent" onClick={action('click')} />
  ));
