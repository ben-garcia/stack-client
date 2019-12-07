import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Paragraph from '.';

describe('<Paragraph />', () => {
  it('should render', () => {
    const { container } = render(
      <Paragraph>This is text inside a Paragraph.</Paragraph>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should render with ONLY child', () => {
      const wrapper: ShallowWrapper = shallow(
        <Paragraph>This is text.</Paragraph>
      );

      expect(wrapper.children().length).toBe(1);
    });
  });
});
