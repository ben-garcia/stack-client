import { Workspace } from 'store/workspaces';

export enum WorkspaceActions {
  GET_CURRENT_WORKSPACE = 'GET_CURRENT_WORKSPACE',
}

export type WorkspaceState = Workspace;

interface GetCurrentWorkspace {
  type: typeof WorkspaceActions.GET_CURRENT_WORKSPACE;
  payload: Workspace;
}

export type WorkspaceActionTypes = GetCurrentWorkspace;
