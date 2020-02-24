import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { userLoggedIn } from 'store/user';
import { requestUserWorkspaces } from 'store/workspaces';
import { LoginPage } from '..';

const mockStore = configureStore();
let store = mockStore({});

// stub out useHistory hook
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

describe('LoginPage Integration', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  });
  afterEach(cleanup);

  it('should render', () => {
    expect(result.container).toBeInTheDocument();
  });

  describe('user interactions', () => {
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

  describe('redux', () => {
    describe('actions', () => {
      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch userLoggedIn with user', () => {
        const user = {
          id: 1,
          username: 'test',
          email: 'test@testing.com',
          createdAt: 'gjgjgjg',
          updatedAt: 'fjfjfjffjf',
        };

        store.dispatch(userLoggedIn(user));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'USER_LOGGED_IN', payload: user });
      });

      it('should dispatch requestUserWorkspaces action', () => {
        store.dispatch(requestUserWorkspaces());

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'REQUEST_USER_WORKSPACES' });
      });
    });
  });
});
