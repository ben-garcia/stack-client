import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import FormInput from '.';

describe('<FormInput />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FormInput inputId="input-id" label="label" type="text" />
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as div', () => {
    expect(wrapper.name()).toBe('div');
  });

  describe('render a label element', () => {
    it('should contain "(Optional)" by default', () => {
      const labelWrapper = wrapper.find('label');

      expect(
        labelWrapper
          .find('Text.field-label__message')
          .dive()
          .text()
      ).toBe(' (Required)');
      expect(labelWrapper.text()).toMatch(/label/);
      expect(labelWrapper.prop('htmlFor')).toBe('input-id');
    });

    it('should contain with "(Required)" when "required" prop is set to false', () => {
      const newWrapper = shallow(
        <FormInput
          inputId="secret-id"
          label="this is a label"
          required={false}
          type="text"
        />
      );
      const labelWrapper = newWrapper.find('label');

      expect(
        labelWrapper
          .find('Text.field-label__message')
          .dive()
          .text()
      ).toBe(' (Optional)');
      expect(labelWrapper.text()).toMatch(/this is a label/);
      expect(labelWrapper.prop('htmlFor')).toBe('secret-id');
    });
  });

  describe('render an input element', () => {
    it('with default props', () => {
      const inputWrapper = wrapper.find('input');

      expect(inputWrapper.prop('type')).toBe('text');
      expect(inputWrapper.prop('value')).toBe('');
      expect(inputWrapper.prop('onChange')).toBeUndefined();
      expect(inputWrapper.prop('onBlur')).toBeUndefined();
    });

    it('should call onChange callback when typing', () => {
      const onChangeSpy = jest.fn();
      const newWrapper = shallow(
        <FormInput
          onChange={onChangeSpy}
          label="this label"
          inputId="bestId"
          type="text"
        />
      );

      newWrapper.find('input[type="text"]').simulate('change');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur callback when user leaves input field', () => {
      const onBlurSpy = jest.fn();
      const newWrapper = shallow(
        <FormInput
          onBlur={onBlurSpy}
          label="this label"
          inputId="bestId"
          type="text"
        />
      );

      newWrapper.find('input[type="text"]').simulate('blur');

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    it('should NOT render <Dialog> by default', () => {
      expect(wrapper.find('Dialog').exists()).toBe(false);
    });

    it('should render 1 <Dialog> when passing "error" prop', () => {
      const newWrapper = shallow(
        <FormInput error="error" label="thislabel" inputId="id" type="text" />
      );
      expect(newWrapper.find('Dialog').length).toBe(1);
    });

    it('should render 1 <Dialog> when passing an array to "error" prop', () => {
      const newWrapper = shallow(
        <FormInput
          error={['error', 'anothererror']}
          label="thislabel"
          inputId="id"
          type="text"
        />
      );

      expect(newWrapper.find('Dialog').length).toBe(1);
    });

    it('should NOT render a <Dialog> when passing empty string to "error" prop', () => {
      const newWrapper = shallow(
        <FormInput error="" label="thislabel" inputId="id" type="text" />
      );
      expect(newWrapper.find('Dialog').length).toBe(0);
    });

    it('should NOT render a <Dialog> when passing empty array to "error" prop', () => {
      const newWrapper = shallow(
        <FormInput error={[]} label="thislabel" inputId="id" type="text" />
      );
      expect(newWrapper.find('Dialog').length).toBe(0);
    });
  });
});
