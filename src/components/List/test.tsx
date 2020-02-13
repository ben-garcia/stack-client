import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { List } from 'components';

describe('<List />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<List>testing</List>);
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render with the correct classes', () => {
    expect(wrapper.hasClass('list')).toBe(true);
  });
});
