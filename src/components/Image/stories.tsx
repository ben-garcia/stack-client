import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from '.';
import logo from '../../logo.svg';

storiesOf('Image', module).add('default', () => (
  <Image src={logo} alt="logo" />
));
