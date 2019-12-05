import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Image from '.';

describe('<Image />', () => {
  it('should render', () => {
    const { container } = render(<Image src="testing" alt="alternative" />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with required props', () => {
      const wrapper: ShallowWrapper = shallow(
        <Image src="testing" alt="alternative" />
      );

      expect(wrapper.prop('src')).toEqual('testing');
      expect(wrapper.prop('alt')).toEqual('alternative');
    });
  });
});
