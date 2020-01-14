import {
  RECEIVED_USER_WORKSPACES,
  RECEIVED_USER_WORKSPACES_ERROR,
  ADD_WORKSPACE,
  WorkspacesState,
  WorkspacesActionTypes,
} from './types';

const initialState: WorkspacesState = {
  list: [],
};

const workspacesReducer = (
  state: WorkspacesState = initialState,
  action: WorkspacesActionTypes
): WorkspacesState => {
  switch (action.type) {
    case RECEIVED_USER_WORKSPACES:
      return {
        list: [...action.payload],
      };
    case RECEIVED_USER_WORKSPACES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case ADD_WORKSPACE:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default workspacesReducer;
