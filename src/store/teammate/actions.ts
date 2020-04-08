import { Teammate } from 'store/teammates';
import { TeammateActions, TeammateActionTypes } from './types';

const GetCurrentTeammate = (teammate: Teammate): TeammateActionTypes => ({
  type: TeammateActions.GET_CURRENT_TEAMMATE,
  payload: teammate,
});

export default GetCurrentTeammate;
