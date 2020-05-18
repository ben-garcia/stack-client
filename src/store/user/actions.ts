import { UserActionTypes, User, UserActions } from './types';

export const UserLoggedIn = (user: User): UserActionTypes => ({
  type: UserActions.USER_LOGGED_IN,
  payload: user,
});

export const UserLoggedOut = (): UserActionTypes => ({
  type: UserActions.USER_LOGGED_OUT,
});
