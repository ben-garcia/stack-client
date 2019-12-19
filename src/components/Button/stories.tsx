import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '..';

storiesOf('Button', module)
  .add('default', () => <Button type="button" text="Button" />)
  .add('with onClick', () => (
    <Button type="button" text="Button" onClick={action('click')} />
  ))
  .add('with tranparent color', () => (
    <Button type="button" text="Button" color="transparent" />
  ))
  .add('with Icon', () => (
    <Button type="button" color="transparent" iconType="plus" />
  ));
