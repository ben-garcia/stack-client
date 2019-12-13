import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import FormGroup from '.';

describe('<FormGroup />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <FormGroup>
        <input />
      </FormGroup>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with at least 2 child', () => {
      const wrapper: ShallowWrapper = shallow(
        <FormGroup>
          <label />
          <input />
        </FormGroup>
      );

      expect(wrapper.children().length).toBeGreaterThan(1);
    });
  });
});
