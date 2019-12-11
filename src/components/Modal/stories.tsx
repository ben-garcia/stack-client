import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '.';

storiesOf('Modal', module).add('default', () => (
  <Modal open header="Modal Header">
    Modal Example
  </Modal>
));
