import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import FormCheckbox from '.';

describe('<FormCheckbox />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<FormCheckbox inputId="input-id" label="this-label" />);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as div', () => {
    expect(wrapper.name()).toBe('div');
  });

  it('should contain label element with "this-label" by default', () => {
    const labelWrapper = wrapper.find('label');

    expect(
      labelWrapper
        .find('Text.label-message')
        .dive()
        .text()
    ).toBe('this-label');
    expect(labelWrapper.prop('htmlFor')).toBe('input-id');
  });

  describe('render an input element', () => {
    it('with default props', () => {
      const inputWrapper = wrapper.find('input');

      expect(inputWrapper.prop('type')).toBe('checkbox');
      expect(inputWrapper.prop('value')).toBe('');
      expect(inputWrapper.prop('onChange')).toBeUndefined();
      expect(inputWrapper.prop('onBlur')).toBeUndefined();
    });

    it('should call onChange callback when typing', () => {
      const onChangeSpy = jest.fn();
      const newWrapper = shallow(
        <FormCheckbox
          onChange={onChangeSpy}
          label="this label"
          inputId="bestId"
        />
      );

      newWrapper.find('input[type="checkbox"]').simulate('change');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur callback when user leaves input field', () => {
      const onBlurSpy = jest.fn();
      const newWrapper = shallow(
        <FormCheckbox onBlur={onBlurSpy} label="this label" inputId="bestId" />
      );

      newWrapper.find('input[type="checkbox"]').simulate('blur');

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    it('should NOT render <Dialog> by default', () => {
      expect(wrapper.find('Dialog').exists()).toBe(false);
    });

    it('should render 1 <Dialog> when passing "error" prop', () => {
      const newWrapper = shallow(
        <FormCheckbox error="error" label="thislabel" inputId="id" />
      );
      expect(newWrapper.find('Dialog').length).toBe(1);
    });

    it('should render 1 <Dialog> when passing an array to "error" prop', () => {
      const newWrapper = shallow(
        <FormCheckbox
          error={['error', 'anothererror']}
          label="thislabel"
          inputId="id"
        />
      );

      expect(newWrapper.find('Dialog').length).toBe(1);
    });

    it('should NOT render a <Dialog> when passing empty string to "error" prop', () => {
      const newWrapper = shallow(
        <FormCheckbox error="" label="thislabel" inputId="id" />
      );
      expect(newWrapper.find('Dialog').length).toBe(0);
    });

    it('should NOT render a <Dialog> when passing empty array to "error" prop', () => {
      const newWrapper = shallow(
        <FormCheckbox error={[]} label="thislabel" inputId="id" />
      );
      expect(newWrapper.find('Dialog').length).toBe(0);
    });
  });
});
