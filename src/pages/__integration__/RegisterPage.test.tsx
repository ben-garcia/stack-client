import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  waitForElement,
} from '@testing-library/react';

import { RegisterPage } from '..';

describe('RegisterPage Integration', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <RegisterPage
        setLoginModalIsOpen={() => {}}
        setRegisterModalIsOpen={() => {}}
      />
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('user interactions', () => {
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <RegisterPage
          setLoginModalIsOpen={() => {}}
          setRegisterModalIsOpen={() => {}}
        />
      );
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
      const usernameInput = result.getByLabelText(/username/, {
        selector: 'input',
      });
      expect(usernameInput.getAttribute('value')).toBe('');
      fireEvent.change(usernameInput, {
        target: { value: 'testing' },
      });
      expect(usernameInput.getAttribute('value')).toBe('testing');
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

    it('should enable submit button when input fields have been validated', async () => {
      const submitButton = result.getByText('Register');
      const emailInput = result.getByLabelText(/email/, {
        selector: 'input',
      });
      const usernameInput = result.getByLabelText(/username/, {
        selector: 'input',
      });
      const passwordInput = result.getByLabelText(/password/, {
        selector: 'input',
      });

      expect(submitButton.getAttribute('disabled')).toBeDefined();

      fireEvent.change(emailInput, { target: { value: 'testing@test.com' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      await waitForElement(() => submitButton);

      expect(submitButton.getAttribute('disabled')).toBeFalsy();
    });
  });
});
