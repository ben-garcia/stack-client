import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import LoginPage from '.';

describe('<LoginPage />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<LoginPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
