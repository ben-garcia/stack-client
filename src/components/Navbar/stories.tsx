import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Image, Navbar } from '..';
import logo from '../../logo.svg';

storiesOf('Navbar', module)
  .add('default', () => <Navbar />)
  .add('with children', () => (
    <Navbar>
      <Image src={logo} alt="stack logo" />
      <div>
        <Button text="Log in" color="transparent" onClick={action('click')} />
        <Button text="Register" onClick={action('click')} />
      </div>
    </Navbar>
  ));
