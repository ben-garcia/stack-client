import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Modal from '.';

describe('<Modal />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <Modal open header="Modal Example">
        Testing
      </Modal>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with children by default', () => {
      const wrapper: ShallowWrapper = shallow(
        <Modal open header="Modal Header">
          Testing Again
        </Modal>
      );

      expect(wrapper.children().length).toBeGreaterThan(0);
    });
  });
});
