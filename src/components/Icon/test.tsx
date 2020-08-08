import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Icon from '.';

describe('<Icon />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Icon type="user" />);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <i> tag', () => {
    expect(wrapper.name()).toBe('i');
  });
});
