import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import Dashboard from '.';

describe('Dashboard />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<Dashboard />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
