import React from 'react';
import { storiesOf } from '@storybook/react';

import Placeholder from '.';

storiesOf('Placeholder', module)
  .add('with messages', () => (
    <div style={{ height: '50vh', width: '50vw' }}>
      <Placeholder color="dark" type="message" />
    </div>
  ))
  .add('with list', () => (
    <div style={{ height: '50vh', width: '50vw' }}>
      <Placeholder color="dark" type="list" />
    </div>
  ))
  .add('info', () => (
    <div style={{ height: '50vh', width: '50vw' }}>
      <Placeholder color="dark" type="info" />
    </div>
  ));
