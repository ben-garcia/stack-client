import { USER_LOGGED_IN, UserState, UserActionTypes } from './types';

const initialState: UserState = {
  isLoggedIn: false,
};

const userReducer = (
  state: Readonly<UserState> = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
