// import { mount, ReactWrapper } from 'enzyme';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Modal from '.';

describe('<Modal />', () => {
  // let wrapper: ReactWrapper;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    if (!document.getElementById('root')) {
      const root = document.createElement('div');
      root.setAttribute('id', 'root');
      document.body.appendChild(root);
    }

    const modalRoot = (global as any).document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = (global as any).document.querySelector('body');
    body.appendChild(modalRoot);

    // wrapper = mount(<Modal>modal</Modal>);
    wrapper = shallow(<Modal>modal</Modal>);
  });

  afterEach(() => {
    const root = document.getElementById('root');
    if (root) {
      (root as HTMLElement & { inert?: boolean }).inert = false;
    }
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <div>', () => {
    expect(wrapper.find('.modal-background').name()).toBe('div');
  });

  it('should be focus the close button default', () => {
    const newWrapper = mount(<Modal header="test">modal</Modal>);
    expect(newWrapper.find('button.modal__button-close').is(':focus')).toBe(
      true
    );
  });

  it('should be focused when passing background={false}', () => {
    const newWrapper = mount(<Modal background={false}>modal</Modal>);
    expect(newWrapper.is(':focus')).toBe(false);
  });

  it('should not render with close button by dafault', () => {
    expect(wrapper.find('.modal__button-close').exists()).toBe(false);
  });

  it('should render with close button when header prop is supplied', () => {
    const newWrapper = shallow(<Modal header="heading">modal</Modal>);
    expect(newWrapper.find('.modal__button-close').exists()).toBe(true);
  });

  it('should call the onClose callback when modal background is clicked', () => {
    const onCloseSpy = jest.fn();
    const newWrapper = mount(
      <Modal header="heading" onClose={onCloseSpy}>
        modal
      </Modal>
    );

    newWrapper
      .find('.modal-background--dark')
      .simulate('click', { e: { currentTarget: {}, target: {} } });

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onClose callback when ESC key is pressed', () => {
    const onCloseSpy = jest.fn();
    mount(
      <Modal header="heading" onClose={onCloseSpy}>
        modal
      </Modal>
    );

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
      })
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should NOT call the onClose callback when ESC key is pressed with "background={false}"', () => {
    const onCloseSpy = jest.fn();
    const newWrapper = mount(
      <Modal background={false} onClose={onCloseSpy}>
        modal
      </Modal>
    );

    newWrapper
      .find('.modal-background--transparent')
      .simulate('keyup', { keyCode: 27 });

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
  });
});
