export const GET_CURRENT_TEAMMATE_ID = 'GET_CURRENT_TEAMMATE_ID';

export type TeammateState = number;

interface GetCurrentTeammateId {
  type: typeof GET_CURRENT_TEAMMATE_ID;
  payload: number;
}

export type TeammateActionTypes = GetCurrentTeammateId;