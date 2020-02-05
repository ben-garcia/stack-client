import {
  RECEIVED_WORKSPACE_TEAMMATES,
  RECEIVED_WORKSPACE_TEAMMATES_ERROR,
  ADD_TEAMMATE,
  TeammatesState,
  TeammatesActionTypes,
} from './types';

const initialState: TeammatesState = {
  list: [],
};

const teammatesReducer = (
  state: Readonly<TeammatesState> = initialState,
  action: TeammatesActionTypes
): TeammatesState => {
  switch (action.type) {
    case RECEIVED_WORKSPACE_TEAMMATES:
      return {
        list: [...action.payload],
      };
    case RECEIVED_WORKSPACE_TEAMMATES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case ADD_TEAMMATE:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default teammatesReducer;
