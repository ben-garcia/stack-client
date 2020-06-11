/* eslint-disable no-case-declarations */
import {
  TeammatesActions,
  TeammatesState,
  TeammatesActionTypes,
  Teammate,
} from './types';

const initialState: TeammatesState = {
  isLoading: false,
  list: [],
};

const teammatesReducer = (
  state: Readonly<TeammatesState> = initialState,
  action: TeammatesActionTypes
): TeammatesState => {
  switch (action.type) {
    case TeammatesActions.ADD_TEAMMATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case TeammatesActions.CLEAR_TEAMMATES:
      return {
        ...state,
        list: [],
      };
    case TeammatesActions.TEAMMATE_CONNECTED:
      const teammate = state.list.find(
        (t: Teammate) => t.username === action.payload
      );
      if (teammate) teammate.active = true;
      return {
        ...state,
        list: [...state.list],
      };
    case TeammatesActions.TEAMMATE_DISCONNECTED:
      const teammateToChange = state.list.find(
        (t: Teammate) => t.username === action.payload
      );
      if (teammateToChange) teammateToChange.active = false;
      return {
        ...state,
        list: [...state.list],
      };
    case TeammatesActions.REQUEST_WORKSPACE_TEAMMATES:
      return {
        ...state,
        isLoading: true,
      };
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES:
      return {
        ...state,
        isLoading: false,
        list: [...action.payload],
      };
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES_ERROR:
      return {
        list: [],
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teammatesReducer;
