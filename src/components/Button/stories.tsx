import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '.';

storiesOf('Button', module)
  .add('default', () => <Button text="Button" />)
  .add('with tranparent color', () => (
    <Button text="Button" color="transparent" />
  ));
