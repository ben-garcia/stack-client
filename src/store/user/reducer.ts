import { UserActions, UserActionTypes, UserState } from './types';

const initialState: UserState = {
  isLoggedIn: false,
};

const UserReducer = (
  state: Readonly<UserState> = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case UserActions.USER_LOGGED_IN:
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    case UserActions.USER_LOGGED_OUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
