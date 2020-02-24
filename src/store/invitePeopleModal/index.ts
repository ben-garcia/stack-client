// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  InvitePeopleModalState as InvitePeoleModalStateAlias,
  InvitePeopleModalActionTypes as InvitePeopleModalActionTypesAlias,
} from './types';
import InvitePeopleModalReducer from './reducer';

export { closeInvitePeopleModal, openInvitePeopleModal } from './actions';
export { InvitePeopleModalActions } from './types';

export type InivitePeopleModallState = InvitePeoleModalStateAlias;
export type InvitePeopleModalActionTypes = InvitePeopleModalActionTypesAlias;
export const invitePeopleModalReducer = InvitePeopleModalReducer;
