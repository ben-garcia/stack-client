import UserReducer from '../reducer';
import { UserState } from '../types';

describe('UserReducer', () => {
  const initialState: UserState = {
    isLoggedIn: false,
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = UserReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return the newly logged in user when action.type === "USER_LOGGED_IN"', () => {
    const payload = {
      id: 1,
      username: 'user52525',
      email: 'email@email.com',
      createdAt: '',
      updatedAt: '',
    };
    const action: any = { type: 'USER_LOGGED_IN', payload };
    const result = UserReducer(initialState, action);
    const expected = {
      isLoggedIn: true,
      ...payload,
    };
    expect(result).toEqual(expected);
    expect(result).not.toEqual(initialState);
  });

  it('return the newly logged in user when action.type === "USER_LOGGED_OUT"', () => {
    const action: any = { type: 'USER_LOGGED_OUT' };
    const result = UserReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
