import {
  GET_CURRENT_WORKSPACE_ID,
  WorkspaceState,
  WorkspaceActionTypes,
} from './types';

const initialState: WorkspaceState = 0;

const workspaceReducer = (
  state: WorkspaceState = initialState,
  action: WorkspaceActionTypes
): WorkspaceState => {
  switch (action.type) {
    case GET_CURRENT_WORKSPACE_ID:
      return action.payload;
    default:
      return state;
  }
};

export default workspaceReducer;
