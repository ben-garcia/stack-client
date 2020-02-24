import { TeammateActions, TeammateState, TeammateActionTypes } from './types';

const initialState: TeammateState = 0;

const TeammateReducer = (
  state: Readonly<TeammateState> = initialState,
  action: TeammateActionTypes
) => {
  switch (action.type) {
    case TeammateActions.GET_CURRENT_TEAMMATE_ID:
      return action.payload;
    default:
      return state;
  }
};

export default TeammateReducer;
