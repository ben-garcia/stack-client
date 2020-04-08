// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import GetCurrentTeammate from './actions';
import TeammateReducer from './reducer';
import {
  TeammateState as TeammateStateAlias,
  TeammateActionTypes as TeammateActionTypesAlias,
} from './types';

export { TeammateActions } from './types';

export type TeammateState = TeammateStateAlias;
export type TeammateActionTypes = TeammateActionTypesAlias;
export const teammateReducer = TeammateReducer;
export const getCurrentTeammate = GetCurrentTeammate;
