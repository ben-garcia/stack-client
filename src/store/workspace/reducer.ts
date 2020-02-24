import {
  WorkspaceActions,
  WorkspaceState,
  WorkspaceActionTypes,
} from './types';

const initialState: WorkspaceState = 0;

const WorkspaceReducer = (
  state: Readonly<WorkspaceState> = initialState,
  action: WorkspaceActionTypes
): WorkspaceState => {
  switch (action.type) {
    case WorkspaceActions.GET_CURRENT_WORKSPACE_ID:
      return action.payload;
    default:
      return state;
  }
};

export default WorkspaceReducer;
