import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from '.';

storiesOf('Text', module)
  .add('with p', () => (
    <div>
      <Text size="xm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xm)
      </Text>
      <Text size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: sm)
      </Text>
      <Text size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: md)
      </Text>
      <Text size="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: lg)
      </Text>
      <Text size="xlg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xlg)
      </Text>
    </div>
  ))
  .add('with div', () => (
    <div>
      <Text tag="div" size="xm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xm)
      </Text>
      <Text tag="div" size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: sm)
      </Text>
      <Text tag="div" size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: md)
      </Text>
      <Text tag="div" size="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: lg)
      </Text>
      <Text tag="div" size="xlg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xlg)
      </Text>
    </div>
  ))
  .add('with span', () => (
    <div>
      <Text tag="span" size="xm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xm)
      </Text>
      <Text tag="span" size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: sm)
      </Text>
      <Text tag="span" size="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: md)
      </Text>
      <Text tag="span" size="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: lg)
      </Text>
      <Text tag="span" size="xlg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.(size: xlg)
      </Text>
    </div>
  ));
