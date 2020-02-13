import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ListItem from '.';

describe('<ListItem />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<ListItem>testing</ListItem>);
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have the correct classes', () => {
    expect(wrapper.hasClass('list__item')).toBe(true);
    expect(wrapper.hasClass('list__item--active')).toBe(false);
  });

  it('should have active class when active prop is passed', () => {
    const wrapper2: ShallowWrapper = shallow(
      <ListItem active>testing</ListItem>
    );

    expect(wrapper2.hasClass('list__item--active')).toBe(true);
  });
});
