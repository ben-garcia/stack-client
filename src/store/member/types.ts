export const GET_CURRENT_MEMBER_ID = 'GET_CURRENT_MEMBER_ID';

export type MemberState = number;

interface GetCurrentMemberId {
  type: typeof GET_CURRENT_MEMBER_ID;
  payload: number;
}

export type MemberActionTypes = GetCurrentMemberId;
