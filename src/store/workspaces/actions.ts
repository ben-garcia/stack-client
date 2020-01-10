import {
  REQUEST_USER_WORKSPACES,
  RECEIVED_USER_WORKSPACES,
  RECEIVED_USER_WORKSPACES_ERROR,
  WorkspacesError,
  Workspace,
  WorkspacesActionTypes,
} from './types';

export const requestUserWorkspaces = (): WorkspacesActionTypes => ({
  type: REQUEST_USER_WORKSPACES,
});

export const receivedUserWorkspaces = (
  workspaces: Workspace[]
): WorkspacesActionTypes => ({
  type: RECEIVED_USER_WORKSPACES,
  payload: workspaces,
});

export const receivedUserWorkspacesError = (
  error: WorkspacesError
): WorkspacesActionTypes => ({
  type: RECEIVED_USER_WORKSPACES_ERROR,
  payload: error,
});
