import {
  TeammatesActions,
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
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES:
      return {
        list: [...action.payload],
      };
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case TeammatesActions.ADD_TEAMMATE:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default teammatesReducer;
