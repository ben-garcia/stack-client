import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '.';

storiesOf('Header', module).add('all', () => (
  <div>
    <Header headerPosition="left" heading="Heading" />
    <Header headerPosition="left" heading="Heading" as="h2" />
    <Header headerPosition="left" heading="Heading" as="h3" />
    <Header headerPosition="left" heading="Heading" as="h4" />
    <Header headerPosition="left" heading="Heading" as="h5" />
    <Header headerPosition="left" heading="Heading" as="h6" />
  </div>
));
