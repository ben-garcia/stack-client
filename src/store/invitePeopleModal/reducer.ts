import {
  OPEN_INVITE_PEOPLE_MODAL,
  CLOSE_INVITE_PEOPLE_MODAL,
  InvitePeopleModalState,
  InvitePeopleModalActionTypes,
} from './types';

const initialState: InvitePeopleModalState = false;

const invitePeopleModalReducer = (
  state: Readonly<InvitePeopleModalState> = initialState,
  action: InvitePeopleModalActionTypes
): InvitePeopleModalState => {
  switch (action.type) {
    case OPEN_INVITE_PEOPLE_MODAL:
      return action.payload;
    case CLOSE_INVITE_PEOPLE_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default invitePeopleModalReducer;
