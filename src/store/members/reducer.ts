import { MembersActions, MembersState, MembersActionTypes } from './types';

const initialState: MembersState = { list: [] };

const MembersReducer = (
  state: Readonly<MembersState> = initialState,
  action: MembersActionTypes
) => {
  switch (action.type) {
    case MembersActions.ADD_MEMBER:
      return {
        list: [...state.list, action.payload],
      };
    case MembersActions.CLEAR_CHANNEL_MEMBERS:
      return {
        list: [],
      };
    case MembersActions.RECEIVED_CHANNEL_MEMBERS:
      return {
        list: [...action.payload],
      };
    case MembersActions.RECEIVED_CHANNEL_MEMBERS_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MembersReducer;
