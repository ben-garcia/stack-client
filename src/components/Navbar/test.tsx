import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Navbar from '.';

describe('<Navbar />', () => {
  it('should render', () => {
    const { container } = render(<Navbar />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should have flex-direction: row by default', () => {
      const wrapper: ShallowWrapper = shallow(<Navbar />);

      expect(wrapper.hasClass('navigation--row')).toBe(true);
    });

    it('should have flex-direction: column when passing in the proper prop', () => {
      const wrapper: ShallowWrapper = shallow(<Navbar direction="column" />);

      expect(wrapper.hasClass('navigation--column')).toBe(true);
    });

    it('should render proper amount of children', () => {
      const wrapper: ShallowWrapper = shallow(
        <Navbar>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Navbar>
      );

      expect(wrapper.find('div').length).toBe(3);
    });
  });
});
