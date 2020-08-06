import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import NavbarItem from '.';

describe('<Navbar />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<NavbarItem>item</NavbarItem>);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <li> tag', () => {
    const wrapper: ShallowWrapper = shallow(
      <NavbarItem>navbar item</NavbarItem>
    );

    expect(wrapper.name()).toBe('li');
  });
});
