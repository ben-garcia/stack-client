import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';

export interface DashboardProps {
  user: UserState;
  userLoggedInAction: typeof userLoggedIn;
}
