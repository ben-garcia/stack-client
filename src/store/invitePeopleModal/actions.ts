import {
  OPEN_INVITE_PEOPLE_MODAL,
  CLOSE_INVITE_PEOPLE_MODAL,
  InvitePeopleModalActionTypes,
} from './types';

export const openInvitePeopleModal = (): InvitePeopleModalActionTypes => ({
  type: OPEN_INVITE_PEOPLE_MODAL,
});

export const closeInvitePeopleModal = (): InvitePeopleModalActionTypes => ({
  type: CLOSE_INVITE_PEOPLE_MODAL,
});
