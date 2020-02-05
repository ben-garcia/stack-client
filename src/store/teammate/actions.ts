import { GET_CURRENT_TEAMMATE_ID, TeammateActionTypes } from './types';

const getCurrentTeammateId = (id: number): TeammateActionTypes => ({
  type: GET_CURRENT_TEAMMATE_ID,
  payload: id,
});

export default getCurrentTeammateId;
