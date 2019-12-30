import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import { LoginPage } from '..';

describe('LoginPage Integration', () => {
  it('should render', () => {
    const { container }: RenderResult = render(<LoginPage />);

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('user interactions', () => {
    let result: RenderResult;

    beforeEach(() => {
      result = render(<LoginPage />);
    });
    afterEach(cleanup);

    it('should change value of email when user types', () => {
      const emailInput = result.getByLabelText(/email/, { selector: 'input' });
      expect(emailInput.getAttribute('value')).toBe('');
      fireEvent.change(emailInput, {
        target: { value: 'testing@testing.com' },
      });
      expect(emailInput.getAttribute('value')).toBe('testing@testing.com');
    });

    it('should change value of username when user types', () => {
      const passwordInput = result.getByLabelText(/password/, {
        selector: 'input',
      });
      expect(passwordInput.getAttribute('value')).toBe('');
      fireEvent.change(passwordInput, {
        target: { value: 'password' },
      });
      expect(passwordInput.getAttribute('value')).toBe('password');
    });
  });
});
