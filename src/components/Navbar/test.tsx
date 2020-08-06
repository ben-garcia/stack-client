import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Navbar from '.';

describe('<Navbar />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Navbar>footer</Navbar>);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <nav> tag', () => {
    const wrapper: ShallowWrapper = shallow(<Navbar>footer</Navbar>);

    expect(wrapper.name()).toBe('nav');
  });

  it('should render children wrapped in <ul>', () => {
    const wrapper: ShallowWrapper = shallow(<Navbar>footer</Navbar>);
    const ulWrapper: ShallowWrapper = wrapper.find('ul');

    expect(ulWrapper.exists()).toBe(true);
  });
});
