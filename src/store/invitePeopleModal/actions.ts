import {
  InvitePeopleModalActions,
  InvitePeopleModalActionTypes,
} from './types';

export const openInvitePeopleModal = (): InvitePeopleModalActionTypes => ({
  type: InvitePeopleModalActions.OPEN_INVITE_PEOPLE_MODAL,
});

export const closeInvitePeopleModal = (): InvitePeopleModalActionTypes => ({
  type: InvitePeopleModalActions.CLOSE_INVITE_PEOPLE_MODAL,
});
