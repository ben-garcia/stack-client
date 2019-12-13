import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Icon from '.';

describe('<Icon />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<Icon type="plus" />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
  describe('stories', () => {
    it('should render with the only required prop', () => {
      const wrapper: ShallowWrapper = shallow(<Icon type="plus" />);

      expect(wrapper.prop('type')).not.toBe('');
    });
  });
});
