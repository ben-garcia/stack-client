import {
  GET_CURRENT_TEAMMATE_ID,
  TeammateState,
  TeammateActionTypes,
} from './types';

const initialState: TeammateState = 0;

const teammateReducer = (
  state: Readonly<TeammateState> = initialState,
  action: TeammateActionTypes
) => {
  switch (action.type) {
    case GET_CURRENT_TEAMMATE_ID:
      return action.payload;
    default:
      return state;
  }
};

export default teammateReducer;
