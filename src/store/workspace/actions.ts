import { Workspace } from 'store/workspaces';
import { WorkspaceActions, WorkspaceActionTypes } from './types';

const GetCurrentWorkspace = (workspace: Workspace): WorkspaceActionTypes => ({
  type: WorkspaceActions.GET_CURRENT_WORKSPACE,
  payload: workspace,
});

export default GetCurrentWorkspace;
