import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  waitForElement,
} from '@testing-library/react';

import { LandingPage } from '..';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

describe('LandingPage Integration', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<LandingPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('User interactions', () => {
    let container: RenderResult;

    // add a div with #modal-root id to the global body
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = document.querySelector('body');
    body!.appendChild(modalRoot);

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
