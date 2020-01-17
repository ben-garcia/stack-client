import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Text from '.';

describe('<Text />', () => {
  it('should render', () => {
    const { container } = render(<Text>This is text</Text>);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render as p tag by default', () => {
      const wrapper: ShallowWrapper = shallow(<Text>This is text.</Text>);

      expect(wrapper.find('p').length).toBe(1);
    });
  });
});
