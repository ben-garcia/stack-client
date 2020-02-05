import { Workspace } from 'store/workspaces/types';

import { requestWorkspaceChannels } from 'store/channels/actions';
import { requestWorkspaceTeammates } from 'store/teammates/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';

export interface WorkspaceListProps {
  currentWorkspaceId: number;
  workspaces: Workspace[]; // user's workspaces
  className?: string;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
  requestWorkspaceTeammatesAction: typeof requestWorkspaceTeammates;
}
