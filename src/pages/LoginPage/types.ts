import userLoggedIn from 'store/user/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';

export interface LoginPageProps {
  userLoggedInAction: typeof userLoggedIn;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
}

export interface User {
  email: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  password: string[];
}
