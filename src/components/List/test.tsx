import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import List from '.';

describe('<List />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<List>footer</List>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <ul> tag', () => {
    expect(wrapper.name()).toBe('ul');
  });
});
