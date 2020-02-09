import {
  RECEIVED_CHANNEL_MEMBERS,
  RECEIVED_CHANNEL_MEMBERS_ERROR,
  MembersState,
  MembersActionTypes,
} from './types';

const initialState: MembersState = { list: [] };

const membersReducer = (
  state: Readonly<MembersState> = initialState,
  action: MembersActionTypes
) => {
  switch (action.type) {
    case RECEIVED_CHANNEL_MEMBERS:
      return {
        list: [...action.payload],
      };
    case RECEIVED_CHANNEL_MEMBERS_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default membersReducer;
