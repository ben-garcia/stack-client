import {
  InvitePeopleModalActions,
  InvitePeopleModalState,
  InvitePeopleModalActionTypes,
} from './types';

const initialState: InvitePeopleModalState = false;

const InvitePeopleModalReducer = (
  state: Readonly<InvitePeopleModalState> = initialState,
  action: InvitePeopleModalActionTypes
): InvitePeopleModalState => {
  switch (action.type) {
    case InvitePeopleModalActions.OPEN_INVITE_PEOPLE_MODAL:
      return true;
    case InvitePeopleModalActions.CLOSE_INVITE_PEOPLE_MODAL:
      return false;
    default:
      return state;
  }
};

export default InvitePeopleModalReducer;
