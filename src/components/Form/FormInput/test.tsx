import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import FormInput from '.';

describe('<FormInput />', () => {
  const { container }: RenderResult = render(
    <FormInput
      onChange={() => {}}
      inputId="full-name"
      label="Full Name"
      type="text"
    />
  );

  expect(container).toBeInTheDocument();
  cleanup();

  describe('stories', () => {
    it('should render with the required props', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput
          onChange={() => {}}
          inputId="full-name"
          label="Full Name"
          type="text"
        />
      );

      expect(wrapper.prop('type')).not.toBe('');
      expect(wrapper.prop('id')).not.toBe('');
      expect(wrapper.prop('inputId')).not.toBe('');
    });

    it('should render a label element iwth the corerct attributes', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput
          onChange={() => {}}
          inputId="testing-fullname"
          label="testing-label"
          type="text"
        />
      );
      const label: ShallowWrapper = wrapper.find('label');

      expect(label.length).toBe(1);
      expect(label.prop('htmlFor')).toBe('testing-fullname');
    });

    it('should render an input element with the correct attributes', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput
          onChange={() => {}}
          inputId="full-name"
          label="Full Name"
          type="text"
        />
      );
      const input: ShallowWrapper = wrapper.find('input');

      expect(input.length).toBe(1);
      expect(input.prop('type')).toBe('text');
      expect(input.prop('id')).toBe('full-name');
    });

    it('should render with with class passed in a prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput
          onChange={() => {}}
          inputId="full-name"
          label="Full Name"
          type="text"
          className="testing"
        />
      );

      expect(wrapper.hasClass('testing')).toBe(true);
    });

    it('should render with the correct inputId', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput inputId="input-testing" label="testing" type="text" />
      );

      expect(wrapper.find('input').prop('id')).toBe('input-testing');
    });
  });
});
