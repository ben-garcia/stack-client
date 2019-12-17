import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Modal from '../Modal';

describe('Modal Integration', () => {
  it('should render a Button with the proper class', () => {
    const wrapper: ReactWrapper = mount(
      <Modal open header="Header">
        The Modal
      </Modal>
    );
    const button: ReactWrapper = wrapper.find('button');

    expect(wrapper.find('Button').length).toBe(1);
    expect(button.length).toBe(1);
    expect(button.hasClass('modal__button-close')).toBe(true);
  });
});
