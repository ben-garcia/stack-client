// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  Member as MemberAlias,
  MembersState as MembersStateAlias,
  MembersActionTypes as MembersActionTypesAlias,
} from './types';
import MembersReducer from './reducer';
import getAllChannelMembers from './sagas';

export {
  addMember,
  clearMembers,
  receivedChannelMembers,
  receivedChannelMembersError,
  requestChannelMembers,
} from './actions';
export { MembersActions } from './types';

export type Member = MemberAlias;
export type MembersState = MembersStateAlias;
export type MembersActionTypes = MembersActionTypesAlias;
export const membersReducer = MembersReducer;
export const getAllCurrentChannelMembers = getAllChannelMembers;
