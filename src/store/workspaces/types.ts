export const REQUEST_USER_WORKSPACES = 'REQUEST_USER_WORKSPACES';
export const RECEIVED_USER_WORKSPACES = 'RECEIVED_USER_WORKSPACES';
export const RECEIVED_USER_WORKSPACES_ERROR = 'RECEIVED_USER_WORKSPACES_ERROR';
// update workspaces when user has create a new workspace
export const ADD_WORKSPACE = 'ADD_WORKSPACE';

export interface Workspace {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacesState {
  list: Workspace[];
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

interface AddWorkspace {
  type: typeof ADD_WORKSPACE;
  payload: Workspace;
}

export type WorkspacesActionTypes =
  | RequestUserWorkspaces
  | ReceivedUserWorkspaces
  | ReceivedUserWorkspacesError
  | AddWorkspace;
