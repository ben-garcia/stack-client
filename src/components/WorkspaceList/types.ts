import { Workspace } from 'store/workspaces/types';

export interface WorkspaceListProps {
  className?: string;
  workspaces: Workspace[]; // user's workspaces
}
