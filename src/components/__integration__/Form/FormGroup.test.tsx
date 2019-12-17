import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import FormGroup from '../../Form/FormGroup';
import FormInput from '../../Form/FormInput';

describe('FormGroup Integration', () => {
  it('should render FormInput', () => {
    const wrapper: ReactWrapper = mount(
      <FormGroup>
        <FormInput label="label" type="text" />
      </FormGroup>
    );

    expect(wrapper.find('FormInput').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should render an input element with the proper attributes', () => {
    const wrapper: ReactWrapper = mount(
      <FormGroup>
        <FormInput label="label" type="text" />
      </FormGroup>
    );
    const input: ReactWrapper = wrapper.find('input');

    expect(input.prop('type')).toBe('text');
    expect(input.prop('placeholder')).toBe('label');
  });
});
