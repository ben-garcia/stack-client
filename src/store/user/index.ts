// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import UserReducer from './reducer';
import UserLoggedIn from './actions';
import {
  UserState as UserStateAlias,
  UserActionTypes as UserActionTypesAlias,
} from './types';

export { UserActions } from './types';
export type UserState = UserStateAlias;
export type UserActionTypes = UserActionTypesAlias;
export const userReducer = UserReducer;
export const userLoggedIn = UserLoggedIn;
