import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Icon from '.';

describe('<Icon />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Icon type="user" />);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <i> tag', () => {
    const wrapper: ShallowWrapper = shallow(<Icon type="user" />);

    expect(wrapper.name()).toBe('i');
  });
});
