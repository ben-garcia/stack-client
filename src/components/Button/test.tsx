import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

import Button from '.';

afterAll(cleanup);

describe('<Button />', () => {
  it('should render', () => {
    const { container } = render(<Button />);
    expect(container).toBeInTheDocument();
  });
});
