import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Button } from '..';

describe('Button Integration', () => {
  it('should render with an Icon when passing iconType prop', () => {
    const mockOnClick = jest.fn();
    const wrapper: ReactWrapper = mount(
      <Button iconType="times" onClick={mockOnClick} />
    );

    expect(wrapper.find('Icon').length).toBe(1);
  });
});
