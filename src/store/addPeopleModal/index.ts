// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  AddPeopleModalState as AddPeopleModalStateAlias,
  AddPeopleModalActionTypes as AddPeopleModalActionTypesAlias,
} from './types';
import AddPeopleModalReducer from './reducer';

export { closeAddPeopleModal, openAddPeopleModal } from './actions';
export { AddPeopleModalActions } from './types';

export type AddPeopleModalState = AddPeopleModalStateAlias;
export type AddPeopleModalActionTypes = AddPeopleModalActionTypesAlias;
export const addPeopleModalReducer = AddPeopleModalReducer;
