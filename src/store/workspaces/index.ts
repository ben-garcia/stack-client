// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  Workspace as WorkspaceAlias,
  WorkspacesState as WorkspacesStateAlias,
  WorkspacesActionTypes as WorkspacesActionTypesAlias,
} from './types';
import WorkspacesReducer from './reducer';
import GetUserWorkspaces from './sagas';

export {
  addWorkspace,
  receivedUserWorkspaces,
  receivedUserWorkspacesError,
  requestUserWorkspaces,
} from './actions';
export { WorkspacesActions } from './types';

export type Workspace = WorkspaceAlias;
export type WorkspacesState = WorkspacesStateAlias;
export type WorkspacesActionTypes = WorkspacesActionTypesAlias;
export const workspacesReducer = WorkspacesReducer;
export const getUserWorkspaces = GetUserWorkspaces;
