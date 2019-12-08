import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import LandingPage from '.';

describe('<LandingPage />', () => {
  it('should render', () => {
    const { container } = render(<LandingPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with at least 1 child', () => {
      const wrapper: ShallowWrapper = shallow(<LandingPage />);

      expect(wrapper.children().length).toBeGreaterThan(0);
    });
  });
});
