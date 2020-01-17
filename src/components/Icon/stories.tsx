import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '.';

storiesOf('Icon', module).add('default', () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div
      style={{ display: 'flex', flexDirection: 'column', margin: '0 0.5rem' }}
    >
      <Icon size="xm" type="plus" />
      <Icon size="sm" type="plus" />
      <Icon size="md" type="plus" />
      <Icon size="lg" type="plus" />
      <Icon size="xlg" type="plus" />
      <Icon size="xxl" type="plus" />
      <span style={{ alignSelf: 'center' }}>plus</span>
    </div>
    <div
      style={{ display: 'flex', flexDirection: 'column', margin: '0 0.5rem' }}
    >
      <Icon size="xm" type="times" />
      <Icon size="sm" type="times" />
      <Icon size="md" type="times" />
      <Icon size="lg" type="times" />
      <Icon size="xlg" type="times" />
      <Icon size="xxl" type="times" />
      <span style={{ alignSelf: 'center' }}>times</span>
    </div>
  </div>
));
