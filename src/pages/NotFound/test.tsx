import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import NotFound from '.';

describe('<NotFound />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<NotFound />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
