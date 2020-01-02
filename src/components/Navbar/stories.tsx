import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Image, Navbar } from '..';
import logo from '../../logo.svg';

storiesOf('Navbar', module)
  .add('default', () => (
    <Navbar>
      <li>link 1</li>
      <li>link 2</li>
    </Navbar>
  ))
  .add('with NavbarItem', () => (
    <Navbar>
      <Navbar.Item>
        <Image src={logo} alt="Stack logo" />
      </Navbar.Item>
      <Navbar.Item>
        <Button
          type="button"
          text="Log in"
          color="transparent"
          onClick={action('click')}
        />
        <Button type="button" text="Register" onClick={action('click')} />
      </Navbar.Item>
    </Navbar>
  ));
