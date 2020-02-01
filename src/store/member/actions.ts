import { GET_CURRENT_MEMBER_ID, MemberActionTypes } from './types';

const getCurrentMemberId = (id: number): MemberActionTypes => ({
  type: GET_CURRENT_MEMBER_ID,
  payload: id,
});

export default getCurrentMemberId;
