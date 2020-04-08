import { Teammate } from 'store/teammates';

export enum TeammateActions {
  GET_CURRENT_TEAMMATE = 'GET_CURRENT_TEAMMATE',
}

export interface TeammateState {
  id: number;
  username: string;
}
interface GetCurrentTeammate {
  type: typeof TeammateActions.GET_CURRENT_TEAMMATE;
  payload: Teammate;
}

export type TeammateActionTypes = GetCurrentTeammate;
