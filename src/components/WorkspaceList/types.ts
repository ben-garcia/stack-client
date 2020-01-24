import { Workspace } from 'store/workspaces/types';

import { requestWorkspaceChannels } from 'store/channels/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';

export interface WorkspaceListProps {
  workspaces: Workspace[]; // user's workspaces
  className?: string;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  requestWorkspaceChannelsAction: typeof requestWorkspaceChannels;
}
