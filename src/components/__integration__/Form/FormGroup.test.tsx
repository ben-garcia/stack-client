import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import FormGroup from '../../Form/FormGroup';
import FormInput from '../../Form/FormInput';

describe('FormGroup Integration', () => {
  it('should render FormInput', () => {
    const wrapper: ReactWrapper = mount(
      <FormGroup>
        <FormInput onChange={() => {}} inputId="id" label="label" type="text" />
      </FormGroup>
    );

    expect(wrapper.find('FormInput').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should render a label that points to input', () => {
    const wrapper: ReactWrapper = mount(
      <FormGroup>
        <FormInput
          onChange={() => {}}
          inputId="test"
          label="label"
          type="text"
        />
      </FormGroup>
    );
    const label: ReactWrapper = wrapper.find('label');
    const input: ReactWrapper = wrapper.find('input');

    expect(label.prop('htmlFor')).toBe('test');
    expect(input.prop('id')).toBe(label.prop('htmlFor'));
  });
});
