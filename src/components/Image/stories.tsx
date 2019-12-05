import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from '.';

storiesOf('Image', module).add('default', () => (
  <Image src="static/media/logo.5d5d9eef.svg" alt="alternative" />
));
