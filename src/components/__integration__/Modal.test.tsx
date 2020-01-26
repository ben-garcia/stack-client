import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Modal from '../Modal';

describe('Modal Integration', () => {
  let wrapper: ReactWrapper;

  // add a div with #modal-root id to the global body
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = document.querySelector('body');
  body!.appendChild(modalRoot);

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render as a React Portal', () => {
    wrapper = mount(<Modal>Testing Testing</Modal>);

    expect(wrapper.find('Portal').length).toBe(1);
  });

  it('should render with the default classes', () => {
    wrapper = mount(<Modal>Testing</Modal>);

    expect(wrapper.find('div').hasClass('modal-background')).toBe(true);
    expect(wrapper.find('div').hasClass('modal-background--dark')).toBe(true);
  });

  it('should rendered without a Header', () => {
    wrapper = mount(<Modal>Test</Modal>);

    expect(wrapper.find('Header').length).toBe(0);
  });

  it('should render a Button with the proper class', () => {
    wrapper = mount(<Modal header="Header">The Modal</Modal>);
    const button: ReactWrapper = wrapper.find('button');

    expect(wrapper.find('Button').length).toBe(1);
    expect(button.length).toBe(1);
    expect(button.hasClass('modal__button-close')).toBe(true);
  });

  it('should render with times Icon', () => {
    wrapper = mount(<Modal header="Header">The Modal</Modal>);
    const icon: ReactWrapper = wrapper.find('i');

    expect(icon.length).toBe(1);
    expect(icon.hasClass('icon')).toBe(true);
    expect(icon.hasClass('icon--times')).toBe(true);
    expect(icon.hasClass('icon--black')).toBe(true);
  });
});
