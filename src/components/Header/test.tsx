import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Header from '.';

describe('<Header />', () => {
  it('should render', () => {
    const { container } = render(<Header heading="This is an H1 heading" />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render as an h1 tag by default', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header heading="This is an H1 heading" />
      );

      expect(wrapper.find('h1')).toHaveLength(1);
    });
  });
});
