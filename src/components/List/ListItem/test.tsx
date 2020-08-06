import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ListItem from '.';

describe('<ListItem />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<ListItem>list item</ListItem>);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <li> tag', () => {
    const wrapper: ShallowWrapper = shallow(
      <ListItem>another list item</ListItem>
    );

    expect(wrapper.name()).toBe('li');
  });
});
