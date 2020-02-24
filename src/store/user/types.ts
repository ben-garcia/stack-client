export enum UserActions {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
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

export type UserActionTypes = UserLoggedIn;
