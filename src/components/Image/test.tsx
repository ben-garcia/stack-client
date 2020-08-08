import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Image from '.';

describe('<Image />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Image alt="alt text" src="source.png" />);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <img> tag', () => {
    expect(wrapper.name()).toBe('img');
  });

  it('should render with correct src and alt attributes', () => {
    expect(wrapper.prop('alt')).toBe('alt text');
    expect(wrapper.prop('src')).toBe('source.png');
  });
});
