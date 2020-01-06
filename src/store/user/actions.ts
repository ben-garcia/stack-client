import { USER_LOGGED_IN, User, UserActionTypes } from './types';

const userLoggedIn = (user: User): UserActionTypes => ({
  type: USER_LOGGED_IN,
  payload: user,
});

export default userLoggedIn;
