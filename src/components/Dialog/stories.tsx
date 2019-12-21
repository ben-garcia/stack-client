import React from 'react';
import { storiesOf } from '@storybook/react';

import Dialog from '.';

storiesOf('Dialog', module)
  .add('default', () => <Dialog content="This is content" />)
  .add('with success', () => <Dialog success content="This is a success" />)
  .add('with failure', () => <Dialog failure content="This was a failure" />)
  .add('with header', () => (
    <Dialog header="Header" content="This is header" />
  ));
