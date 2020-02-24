export enum InvitePeopleModalActions {
  OPEN_INVITE_PEOPLE_MODAL = 'OPEN_INVITE_PEOPLE_MODAL',
  CLOSE_INVITE_PEOPLE_MODAL = 'CLOSE_INVITE_PEOPLE_MODAL',
}

export type InvitePeopleModalState = boolean;

interface OpenInvitePeopleModal {
  type: typeof InvitePeopleModalActions.OPEN_INVITE_PEOPLE_MODAL;
}

interface CloseInvitePeopleModal {
  type: typeof InvitePeopleModalActions.CLOSE_INVITE_PEOPLE_MODAL;
}

export type InvitePeopleModalActionTypes =
  | OpenInvitePeopleModal
  | CloseInvitePeopleModal;
