export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  isLoggedIn: boolean;
  id?: string;
  email?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserLoggedIn {
  type: typeof USER_LOGGED_IN;
  payload: User;
}

export type UserActionTypes = UserLoggedIn;
