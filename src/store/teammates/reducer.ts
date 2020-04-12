/* eslint-disable no-case-declarations */
import {
  TeammatesActions,
  TeammatesState,
  TeammatesActionTypes,
  Teammate,
} from './types';

const initialState: TeammatesState = {
  list: [],
};

const teammatesReducer = (
  state: Readonly<TeammatesState> = initialState,
  action: TeammatesActionTypes
): TeammatesState => {
  switch (action.type) {
    case TeammatesActions.ADD_TEAMMATE:
      return {
        list: [...state.list, action.payload],
      };
    case TeammatesActions.TEAMMATE_CONNECTED:
      // eslint-disable-next-line
      console.log('teammate connected: ', action.payload);
      const teammate = state.list.find(
        (t: Teammate) => t.username === action.payload
      );
      teammate!.active = true;
      return {
        list: [...state.list],
      };
    case TeammatesActions.TEAMMATE_DISCONNECTED:
      // eslint-disable-next-line
      console.log('teammate disconnected: ', action.payload);
      const teammateToChange = state.list.find(
        (t: Teammate) => t.username === action.payload
      );
      teammateToChange!.active = false;
      return {
        list: [...state.list],
      };
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES:
      return {
        list: [...action.payload],
      };
    case TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES_ERROR:
      return {
        list: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teammatesReducer;
