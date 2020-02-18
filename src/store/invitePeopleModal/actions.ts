import {
  OPEN_INVITE_PEOPLE_MODAL,
  CLOSE_INVITE_PEOPLE_MODAL,
  InvitePeopleModalActionTypes,
} from './types';

export const openInvitePeopleModal = (
  openState: boolean
): InvitePeopleModalActionTypes => ({
  type: OPEN_INVITE_PEOPLE_MODAL,
  payload: openState,
});

export const closeInvitePeopleModal = (
  closeState: boolean
): InvitePeopleModalActionTypes => ({
  type: CLOSE_INVITE_PEOPLE_MODAL,
  payload: closeState,
});
