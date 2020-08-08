import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ListItem from '.';

describe('<ListItem />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ListItem>list item</ListItem>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <li> tag', () => {
    expect(wrapper.name()).toBe('li');
  });
});
