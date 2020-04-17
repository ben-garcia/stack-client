import { AddPeopleModalActions, AddPeopleModalActionTypes } from './types';

export const openAddPeopleModal = (): AddPeopleModalActionTypes => ({
  type: AddPeopleModalActions.OPEN_ADD_PEOPLE_MODAL,
});

export const closeAddPeopleModal = (): AddPeopleModalActionTypes => ({
  type: AddPeopleModalActions.CLOSE_ADD_PEOPLE_MODAL,
});
