import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '..';

storiesOf('Button', module)
  .add('default', () => <Button text="Button" />)
  .add('with onClick', () => <Button text="Button" onClick={action('click')} />)
  .add('with tranparent color', () => (
    <Button text="Button" color="transparent" />
  ))
  .add('with Icon', () => <Button color="transparent" iconType="plus" />);
