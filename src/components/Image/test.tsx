import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Image from '.';

describe('<Image />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(
      <Image alt="alt text" src="source.png" />
    );

    expect(wrapper).toBeDefined();
  });

  it('should render as an <img> tag', () => {
    const wrapper: ShallowWrapper = shallow(
      <Image alt="alt text" src="source.png" />
    );

    expect(wrapper.name()).toBe('img');
  });

  it('should render with correct src and alt attributes', () => {
    const wrapper: ShallowWrapper = shallow(
      <Image alt="alt text" src="source.png" />
    );

    expect(wrapper.prop('alt')).toBe('alt text');
    expect(wrapper.prop('src')).toBe('source.png');
  });
});
