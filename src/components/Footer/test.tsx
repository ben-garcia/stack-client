import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Footer from '.';

describe('<Footer />', () => {
  it('should render', () => {
    const { container } = render(<Footer>Ben Garcia 2019</Footer>);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with children by default', () => {
      const wrapper: ShallowWrapper = shallow(<Footer>Ben Garcia 2019</Footer>);

      expect(wrapper.children().length).toBeGreaterThan(0);
    });

    it('should have the default styles', () => {
      const wrapper: ShallowWrapper = shallow(<Footer>testing</Footer>);

      expect(wrapper.hasClass('footer')).toBe(true);
    });
  });
});
