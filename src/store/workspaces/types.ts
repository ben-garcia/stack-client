export const REQUEST_USER_WORKSPACES = 'REQUEST_USER_WORKSPACES';
export const RECEIVED_USER_WORKSPACES = 'RECEIVED_USER_WORKSPACES';
export const RECEIVED_USER_WORKSPACES_ERROR = 'RECEIVED_USER_WORKSPACES_ERROR';

export interface Workspace {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacesState {
  workspaces: Workspace[];
  error?: WorkspacesError;
}

export type WorkspacesError = string;

interface RequestUserWorkspaces {
  type: typeof REQUEST_USER_WORKSPACES;
}

interface ReceivedUserWorkspaces {
  type: typeof RECEIVED_USER_WORKSPACES;
  payload: Workspace[];
}

interface ReceivedUserWorkspacesError {
  type: typeof RECEIVED_USER_WORKSPACES_ERROR;
  payload: WorkspacesError;
}

export type WorkspacesActionTypes =
  | RequestUserWorkspaces
  | ReceivedUserWorkspaces
  | ReceivedUserWorkspacesError;
