import { Workspace } from 'store/workspaces/types';

import getCurrentWorkspaceId from 'store/workspace/actions';

export interface WorkspaceListProps {
  workspaces: Workspace[]; // user's workspaces
  className?: string;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
}
