import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Scrollbar from '.';

describe('<Scrollbar />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Scrollbar color="dark">
        <div>scrollbar</div>
      </Scrollbar>
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <div>', () => {
    const scrollbarWrapper = wrapper.find('Scrollbar').childAt(0);
    expect(scrollbarWrapper.name()).toBe('div');
  });

  it('should NOT render "scrollbar" when the content isnt tall enough', () => {
    expect(wrapper.find('.scrollbar').exists()).toBe(false);
  });
});
