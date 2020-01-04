import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants';
import { Action } from './types';

const initialState = {
  isLoggedIn: false,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        isLoggedIn: true,
      };
    case USER_LOGGED_OUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
