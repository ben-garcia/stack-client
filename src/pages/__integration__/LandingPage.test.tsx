import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  waitForElement,
} from '@testing-library/react';

import { LandingPage } from '..';

describe('LandingPage Integration', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<LandingPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('User interactions', () => {
    let container: RenderResult;

    beforeEach(() => {
      container = render(<LandingPage />);
    });

    it('should open a modal with RegisterPage when user clicks on Register button', async () => {
      const registerButton = container.getByText('Register');

      fireEvent.click(registerButton);

      const registerModal = await waitForElement(() =>
        container.getByText('Create An Account')
      );

      expect(registerModal).toBeDefined();
    });
  });
});
