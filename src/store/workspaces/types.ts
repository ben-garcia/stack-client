// update workspaces when user has create a new workspace
export enum WorkspacesActions {
  ADD_WORKSPACE = 'ADD_WORKSPACE',
  REQUEST_USER_WORKSPACES = 'REQUEST_USER_WORKSPACES',
  RECEIVED_USER_WORKSPACES = 'RECEIVED_USER_WORKSPACES',
  RECEIVED_USER_WORKSPACES_ERROR = 'RECEIVED_USER_WORKSPACES_ERROR',
}

export interface Workspace {
  id: number;
  name: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacesState {
  error?: WorkspacesError;
  isLoading: boolean;
  list: Workspace[];
}

export type WorkspacesError = string;

interface AddWorkspace {
  type: typeof WorkspacesActions.ADD_WORKSPACE;
  payload: Workspace;
}

interface ReceivedUserWorkspaces {
  type: typeof WorkspacesActions.RECEIVED_USER_WORKSPACES;
  payload: Workspace[];
}

interface ReceivedUserWorkspacesError {
  type: typeof WorkspacesActions.RECEIVED_USER_WORKSPACES_ERROR;
  payload: WorkspacesError;
}

interface RequestUserWorkspaces {
  type: typeof WorkspacesActions.REQUEST_USER_WORKSPACES;
}

export type WorkspacesActionTypes =
  | RequestUserWorkspaces
  | ReceivedUserWorkspaces
  | ReceivedUserWorkspacesError
  | AddWorkspace;
