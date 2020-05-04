import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';

import Placeholder from '.';

describe('<Placeholder />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<Placeholder type="message" />);

    expect(container).toBeInTheDocument();
    cleanup();
  });
});
