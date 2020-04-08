import { TeammateActions, TeammateState, TeammateActionTypes } from './types';

const initialState: TeammateState = { id: 0, username: '' };

const TeammateReducer = (
  state: Readonly<TeammateState> = initialState,
  action: TeammateActionTypes
) => {
  switch (action.type) {
    case TeammateActions.GET_CURRENT_TEAMMATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default TeammateReducer;
