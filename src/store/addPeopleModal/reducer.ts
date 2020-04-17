import {
  AddPeopleModalActions,
  AddPeopleModalActionTypes,
  AddPeopleModalState,
} from './types';

const initialState: AddPeopleModalState = false;

const AddPeopleModalReducer = (
  state: Readonly<AddPeopleModalState> = initialState,
  action: AddPeopleModalActionTypes
): AddPeopleModalState => {
  switch (action.type) {
    case AddPeopleModalActions.OPEN_ADD_PEOPLE_MODAL:
      return true;
    case AddPeopleModalActions.CLOSE_ADD_PEOPLE_MODAL:
      return false;
    default:
      return state;
  }
};

export default AddPeopleModalReducer;
