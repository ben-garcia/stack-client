import { GET_CURRENT_WORKSPACE_ID, WorkspaceActionTypes } from './types';

const getCurrentWorkspaceId = (id: number): WorkspaceActionTypes => ({
  type: GET_CURRENT_WORKSPACE_ID,
  payload: id,
});

export default getCurrentWorkspaceId;
