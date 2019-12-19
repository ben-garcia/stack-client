import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import RegisterPage from '.';

describe('<RegisterPage />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<RegisterPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
