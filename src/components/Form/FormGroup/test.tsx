import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import FormGroup from '.';

describe('<FormGroup />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<FormGroup>form group</FormGroup>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render fieldset element', () => {
    expect(wrapper.name()).toBe('fieldset');
  });
});
