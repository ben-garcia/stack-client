import userLoggedIn from '../../store/user/actions';

export interface LoginPageProps {
  userLoggedInAction: typeof userLoggedIn;
}

export interface User {
  email: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  password: string[];
}
