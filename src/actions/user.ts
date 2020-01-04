import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants';
import { Action } from '../reducers/types';

export const userLoggedIn = (): Action => ({
  type: USER_LOGGED_IN,
});

export const userLoggedOut = (): Action => ({
  type: USER_LOGGED_OUT,
});
