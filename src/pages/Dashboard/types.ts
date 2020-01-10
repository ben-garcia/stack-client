import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';

export interface DashboardProps {
  user: UserState;
  userLoggedInAction: typeof userLoggedIn;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
}
