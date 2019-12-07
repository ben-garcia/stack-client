import React from 'react';
import { storiesOf } from '@storybook/react';

import Paragraph from '.';

storiesOf('Paragraph', module).add('default', () => (
  <Paragraph>This is a Paragraph inside a paragraph tag. Woh</Paragraph>
));
