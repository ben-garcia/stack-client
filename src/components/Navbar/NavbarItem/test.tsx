import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import NavbarItem from '.';

describe('<NavbarItem />', () => {
  it('should render', () => {
    const { container } = render(<NavbarItem>link 1</NavbarItem>);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render as default', () => {
      const wrapper: ShallowWrapper = shallow(<NavbarItem>link 1</NavbarItem>);

      expect(wrapper.hasClass('navigation__item')).toBe(true);
    });

    it('should the correct number of children', () => {
      const wrapper: ShallowWrapper = shallow(
        <NavbarItem>
          <div>first child</div>
          <div>second child</div>
        </NavbarItem>
      );

      expect(wrapper.children().length).toBe(2);
    });
  });
});
