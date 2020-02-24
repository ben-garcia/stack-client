export enum WorkspaceActions {
  GET_CURRENT_WORKSPACE_ID = 'GET_CURRENT_WORKSPACE_ID',
}

export type WorkspaceState = number;

interface GetCurrentWorkspaceId {
  type: typeof WorkspaceActions.GET_CURRENT_WORKSPACE_ID;
  payload: number;
}

export type WorkspaceActionTypes = GetCurrentWorkspaceId;
