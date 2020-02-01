import { GET_CURRENT_MEMBER_ID, MemberState, MemberActionTypes } from './types';

const initialState: MemberState = 0;

const memberReducer = (
  state: Readonly<MemberState> = initialState,
  action: MemberActionTypes
) => {
  switch (action.type) {
    case GET_CURRENT_MEMBER_ID:
      return action.payload;
    default:
      return state;
  }
};

export default memberReducer;
