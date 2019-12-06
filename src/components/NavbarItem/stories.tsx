import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Button, NavbarItem } from '..';

storiesOf('NavbarItem', module)
  .add('default', () => <NavbarItem />)
  .add('with children', () => (
    <NavbarItem>
      <Button text="NavbarItem" onClick={action('click')} />
      <Button
        text="NavbarItem2"
        color="transparent"
        onClick={action('click')}
      />
    </NavbarItem>
  ));
