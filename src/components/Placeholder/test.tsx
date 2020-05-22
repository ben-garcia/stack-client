import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import Placeholder from '.';

describe('<Placeholder />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <Placeholder color="dark" type="message" />
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
