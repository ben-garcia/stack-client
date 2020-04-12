// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  Teammate as TeammateAlias,
  TeammatesState as TeammatesStateAlias,
  TeammatesActionTypes as TeammatesActionTypesAlias,
} from './types';
import TeammatesReducer from './reducer';
import GetAllCurrentWorkspaceTeammates from './sagas';

export {
  addTeammate,
  teammateConnected,
  teammateDisconnected,
  receivedWorkspaceTeammates,
  receivedWorkspaceTeammatesError,
  requestWorkspaceTeammates,
} from './actions';
export { TeammatesActions } from './types';

export type Teammate = TeammateAlias;
export type TeammatesState = TeammatesStateAlias;
export type TeammatesActionTypes = TeammatesActionTypesAlias;
export const teammatesReducer = TeammatesReducer;
export const getAllCurrentWorkspaceTeammates = GetAllCurrentWorkspaceTeammates;
