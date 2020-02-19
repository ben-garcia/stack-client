export const OPEN_INVITE_PEOPLE_MODAL = 'OPEN_INVITE_PEOPLE_MODAL';
export const CLOSE_INVITE_PEOPLE_MODAL = 'CLOSE_INVITE_PEOPLE_MODAL';

export type InvitePeopleModalState = boolean;

interface OpenInvitePeopleModal {
  type: typeof OPEN_INVITE_PEOPLE_MODAL;
}

interface CloseInvitePeopleModal {
  type: typeof CLOSE_INVITE_PEOPLE_MODAL;
}

export type InvitePeopleModalActionTypes =
  | OpenInvitePeopleModal
  | CloseInvitePeopleModal;