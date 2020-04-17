export enum AddPeopleModalActions {
  OPEN_ADD_PEOPLE_MODAL = 'OPEN_ADD_PEOPLE_MODAL',
  CLOSE_ADD_PEOPLE_MODAL = 'CLOSE_ADD_PEOPLE_MODAL',
}

export type AddPeopleModalState = boolean;

interface OpenAddPeopleModal {
  type: typeof AddPeopleModalActions.OPEN_ADD_PEOPLE_MODAL;
}

interface CloseAddPeopleModal {
  type: typeof AddPeopleModalActions.CLOSE_ADD_PEOPLE_MODAL;
}

export type AddPeopleModalActionTypes =
  | OpenAddPeopleModal
  | CloseAddPeopleModal;
