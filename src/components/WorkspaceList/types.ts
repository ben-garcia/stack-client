import { Workspace } from 'store/workspaces/types';

export interface WorkspaceListProps {
  workspaces: Workspace[]; // user's workspaces
  className?: string;
}
