import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import FormInput from '.';

describe('<FormInput />', () => {
  const { container }: RenderResult = render(
    <FormInput label="Full Name" type="text" />
  );

  expect(container).toBeInTheDocument();
  cleanup();

  describe('stories', () => {
    it('should render with the required props', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput label="Full Name" type="text" />
      );

      expect(wrapper.prop('type')).not.toBe('');
      expect(wrapper.prop('id')).not.toBe('');
    });

    it('should render an input element with the correct attributes', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput label="Full Name" type="text" />
      );

      expect(wrapper.find('input').prop('type')).toBe('text');
    });

    it('should render with with class passed in a prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormInput label="Full Name" type="text" className="testing" />
      );

      expect(wrapper.hasClass('testing')).toBe(true);
    });
  });
});
