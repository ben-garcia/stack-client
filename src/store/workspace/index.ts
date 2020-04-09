// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import GetCurrentWorkspace from './actions';
import WorkspaceReducer from './reducer';
import {
  WorkspaceState as WorkspaceStateAlias,
  WorkspaceActionTypes as WorkspaceActionTypesAlias,
} from './types';

export { WorkspaceActions } from './types';

export type WorkspaceState = WorkspaceStateAlias;
export type WorkspaceActionTypes = WorkspaceActionTypesAlias;
export const workspaceReducer = WorkspaceReducer;
export const getCurrentWorkspace = GetCurrentWorkspace;
