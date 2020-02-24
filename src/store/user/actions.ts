import { UserActionTypes, User, UserActions } from './types';

const UserLoggedIn = (user: User): UserActionTypes => ({
  type: UserActions.USER_LOGGED_IN,
  payload: user,
});

export default UserLoggedIn;
