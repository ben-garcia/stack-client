import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Navbar } from '..';
import NavbarItem from '../Navbar/NavbarItem';

describe('Navbar Integration', () => {
  it('should contain ONLY Navbar Items', () => {
    const wrapper: ReactWrapper = mount(
      <Navbar>
        <NavbarItem>Item 1</NavbarItem>
        <NavbarItem>Item 2</NavbarItem>
      </Navbar>
    );
    expect(wrapper.find('NavbarItem').length).toBe(2);
  });
});
