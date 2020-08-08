import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Footer from '.';

describe('<Footer />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer>footer</Footer>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <footer> tag', () => {
    expect(wrapper.name()).toBe('footer');
  });
});
