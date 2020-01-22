import { requestWorkspaceChannels } from 'store/channels/actions';
import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { WorkspacesState } from 'store/workspaces/types';

export interface DashboardProps {
  user: UserState;
  workspaces: WorkspacesState;
  userLoggedInAction: typeof userLoggedIn;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
}
