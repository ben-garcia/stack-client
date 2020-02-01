import getCurrentChannelId from 'store/channel/actions';
import { requestWorkspaceChannels } from 'store/channels/actions';
import { ChannelsState } from 'store/channels/types';
import getCurrentMemberId from 'store/member/actions';
import { requestWorkspaceMembers } from 'store/members/actions';
import { MembersState } from 'store/members/types';
import { UserState } from 'store/user/types';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { WorkspacesState } from 'store/workspaces/types';

export interface DashboardProps {
  channels: ChannelsState;
  currentChannelId: number;
  currentWorkspaceId: number;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentMemberIdAction: typeof getCurrentMemberId;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  members: MembersState;
  requestWorkspaceMembersAction: typeof requestWorkspaceMembers;
  requestUserWorkspacesAction: typeof requestUserWorkspaces;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
  user: UserState;
  userLoggedInAction: typeof userLoggedIn;
  workspaces: WorkspacesState;
}
