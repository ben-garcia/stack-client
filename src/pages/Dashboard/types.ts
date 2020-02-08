import { getCurrentChannelId, updateChannelTopic } from 'store/channel/actions';
import { ChannelState } from 'store/channel/types';
import { requestWorkspaceChannels } from 'store/channels/actions';
import { ChannelsState } from 'store/channels/types';
import getCurrentTeammateId from 'store/teammate/actions';
import { requestWorkspaceTeammates } from 'store/teammates/actions';
import { TeammatesState } from 'store/teammates/types';
import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { WorkspacesState } from 'store/workspaces/types';

export interface DashboardProps {
  channels: ChannelsState;
  currentChannel: ChannelState;
  currentTeammateId: number;
  currentWorkspaceId: number;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentTeammateIdAction: typeof getCurrentTeammateId;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  requestWorkspaceTeammatesAction: typeof requestWorkspaceTeammates;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
  teammates: TeammatesState;
  updateChannelTopicAction: typeof updateChannelTopic;
  user: UserState;
  userLoggedInAction: typeof userLoggedIn;
  workspaces: WorkspacesState;
}
