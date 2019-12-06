import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Image, Navbar, NavbarItem } from '..';
import logo from '../../logo.svg';

storiesOf('Navbar', module)
  .add('default', () => <Navbar />)
  .add('with children', () => (
    <Navbar>
      <NavbarItem>
        <Image src={logo} alt="Stack logo" />
      </NavbarItem>
      <NavbarItem>
        <Button text="Log in" color="transparent" onClick={action('click')} />
        <Button text="Register" onClick={action('click')} />
      </NavbarItem>
    </Navbar>
  ));
