import { TeammateActions, TeammateActionTypes } from './types';

const GetCurrentTeammateId = (id: number): TeammateActionTypes => ({
  type: TeammateActions.GET_CURRENT_TEAMMATE_ID,
  payload: id,
});

export default GetCurrentTeammateId;
