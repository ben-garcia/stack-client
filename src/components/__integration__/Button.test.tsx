import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Button } from '..';

describe('Button Integration', () => {
  it('should render with an Icon when passing iconType prop', () => {
    const mockOnClick = jest.fn();
    const wrapper: ReactWrapper = mount(
      <Button iconType="times" onClick={mockOnClick} />
    );

    expect(wrapper.find('Icon').prop('type')).toBe('times');
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('i').hasClass('icon')).toBe(true);
    expect(wrapper.find('i').hasClass('icon--times')).toBe(true);
  });
});
