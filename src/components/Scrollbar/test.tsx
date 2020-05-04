import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import Scrollbar from '.';

describe('<Scrollbar />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <Scrollbar color="dark">
        <div />
      </Scrollbar>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
