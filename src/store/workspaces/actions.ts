import {
  Workspace,
  WorkspacesActions,
  WorkspacesActionTypes,
  WorkspacesError,
} from './types';

export const addWorkspace = (workspace: Workspace): WorkspacesActionTypes => ({
  type: WorkspacesActions.ADD_WORKSPACE,
  payload: workspace,
});

export const receivedUserWorkspaces = (
  workspaces: Workspace[]
): WorkspacesActionTypes => ({
  type: WorkspacesActions.RECEIVED_USER_WORKSPACES,
  payload: workspaces,
});

export const receivedUserWorkspacesError = (
  error: WorkspacesError
): WorkspacesActionTypes => ({
  type: WorkspacesActions.RECEIVED_USER_WORKSPACES_ERROR,
  payload: error,
});

export const requestUserWorkspaces = (): WorkspacesActionTypes => ({
  type: WorkspacesActions.REQUEST_USER_WORKSPACES,
});
