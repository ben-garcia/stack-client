import getCurrentChannelId from 'store/channel/actions';
import { requestWorkspaceChannels } from 'store/channels/actions';
import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { WorkspacesState } from 'store/workspaces/types';

export interface DashboardProps {
  currentWorkspaceId: number;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
  user: UserState;
  userLoggedInAction: typeof userLoggedIn;
  workspaces: WorkspacesState;
}
