import { WorkspaceActions, WorkspaceActionTypes } from './types';

const GetCurrentWorkspaceId = (id: number): WorkspaceActionTypes => ({
  type: WorkspaceActions.GET_CURRENT_WORKSPACE_ID,
  payload: id,
});

export default GetCurrentWorkspaceId;
