import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import List from '.';

describe('<List />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<List>footer</List>);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <ul> tag', () => {
    const wrapper: ShallowWrapper = shallow(<List>footer</List>);

    expect(wrapper.name()).toBe('ul');
  });
});
