import {
  RECEIVED_WORKSPACE_MEMBERS,
  RECEIVED_WORKSPACE_MEMBERS_ERROR,
  ADD_MEMBER,
  MembersState,
  MembersActionTypes,
} from './types';

const initialState: MembersState = {
  list: [],
};

const membersReducer = (
  state: Readonly<MembersState> = initialState,
  action: MembersActionTypes
): MembersState => {
  switch (action.type) {
    case RECEIVED_WORKSPACE_MEMBERS:
      return {
        list: [...action.payload],
      };
    case RECEIVED_WORKSPACE_MEMBERS_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case ADD_MEMBER:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default membersReducer;
