import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '.';

storiesOf('Header', module)
  .add('default', () => <Header heading="This is an h1 heading" />)
  .add('with children', () => (
    <Header heading="This is h1 heading">
      <p>This is a subheading</p>
    </Header>
  ));
