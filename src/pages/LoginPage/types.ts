import { Action } from '../../reducers/types';

export interface LoginPageProps {
  userLoggedInAction: () => Action;
}

export interface User {
  email: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  password: string[];
}
