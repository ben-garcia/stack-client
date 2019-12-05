import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  afterAll(cleanup);

  it('should render', () => {
    const { container } = render(<Button text="Button" />);
    expect(container).toBeInTheDocument();
  });

  describe('stories', () => {
    it('should render primary color by default', () => {
      const wrapper: ShallowWrapper = shallow(<Button text="Button" />);
      expect(wrapper.hasClass('button--primary')).toBe(true);
    });

    it('should render as transparent when passing transparent color prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button text="Button" color="transparent" />
      );

      expect(wrapper.hasClass('button--transparent')).toBe(true);
    });
  });
});
