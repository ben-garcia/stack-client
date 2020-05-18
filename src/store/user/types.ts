export enum UserActions {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
}

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  isLoggedIn: boolean;
  id?: number;
  email?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserLoggedIn {
  type: typeof UserActions.USER_LOGGED_IN;
  payload: User;
}

interface UserLoggedOut {
  type: typeof UserActions.USER_LOGGED_OUT;
}

export type UserActionTypes = UserLoggedIn | UserLoggedOut;
