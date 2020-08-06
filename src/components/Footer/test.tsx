import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Footer from '.';

describe('<Footer />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Footer>footer</Footer>);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <footer> tag', () => {
    const wrapper: ShallowWrapper = shallow(<Footer>footer</Footer>);

    expect(wrapper.name()).toBe('footer');
  });
});
