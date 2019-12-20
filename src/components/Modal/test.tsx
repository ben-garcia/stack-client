import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Modal from '.';

describe('<Modal />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <Modal header="Modal Example">Testing</Modal>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with children by default', () => {
      const wrapper: ShallowWrapper = shallow(
        <Modal header="Modal Header">Testing Again</Modal>
      );

      expect(wrapper.children().length).toBeGreaterThan(0);
    });
    it('should call the onClose method when close button is clicked', () => {
      const onCloseMock = jest.fn();
      const wrapper: ShallowWrapper = shallow(
        <Modal header="Modal Header" onClose={onCloseMock}>
          Testing Testing
        </Modal>
      );

      expect(onCloseMock).toHaveBeenCalledTimes(0);

      wrapper.find('.modal__button-close').simulate('click');

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
