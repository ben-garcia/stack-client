import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Modal from '../Modal';

describe('Modal Integration', () => {
  it('should render a Button with the proper class', () => {
    const wrapper: ReactWrapper = mount(
      <Modal header="Header">The Modal</Modal>
    );
    const button: ReactWrapper = wrapper.find('button');

    expect(wrapper.find('Button').length).toBe(1);
    expect(button.length).toBe(1);
    expect(button.hasClass('modal__button-close')).toBe(true);
  });

  it('should render with times Icon', () => {
    const wrapper: ReactWrapper = mount(
      <Modal header="Header">The Modal</Modal>
    );
    const icon: ReactWrapper = wrapper.find('i');

    expect(icon.length).toBe(1);
    expect(icon.hasClass('icon')).toBe(true);
    expect(icon.hasClass('icon--times')).toBe(true);
  });
});
