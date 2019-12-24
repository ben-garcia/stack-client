import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import FormInput from '../../Form/FormInput';

describe('FormInput Integration', () => {
  it('should render single error message when single error is passed', () => {
    const wrapper: ReactWrapper = mount(
      <FormInput
        onChange={() => {}}
        error="single-error"
        inputId="inputId"
        label="the label"
        type="text"
      />
    );
    const Dialog: ReactWrapper = wrapper.find('Dialog');

    expect(Dialog.length).toBe(1);
    expect(Dialog.prop('content')).toBe('single-error');
    expect(
      Dialog.find('.dialog__content')
        .at(0)
        .text()
    ).toBe('single-error');
  });

  it('should render multiple error messages when array is passed', () => {
    const wrapper: ReactWrapper = mount(
      <FormInput
        onChange={() => {}}
        error={[
          'houston we have a problem',
          'houston we have got another problem',
        ]}
        inputId="two-errors"
        label="error"
        type="text"
      />
    );
    const lists: ReactWrapper = wrapper.find('li');

    expect(lists.length).toBe(2);
    expect(
      lists
        .at(0)
        .find('p')
        .text()
    ).toBe('houston we have a problem');
    expect(
      lists
        .at(1)
        .find('p')
        .text()
    ).toBe('houston we have got another problem');
  });
});
