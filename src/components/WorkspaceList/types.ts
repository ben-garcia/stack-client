import { Workspace } from 'store/workspaces';

export interface WorkspaceListProps {
  className?: string;
  workspaces: Workspace[]; // user's workspaces
}
