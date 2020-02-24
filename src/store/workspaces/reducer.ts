import {
  WorkspacesState,
  WorkspacesActions,
  WorkspacesActionTypes,
} from './types';

const initialState: WorkspacesState = {
  list: [],
};

const WorkspacesReducer = (
  state: Readonly<WorkspacesState> = initialState,
  action: WorkspacesActionTypes
): WorkspacesState => {
  switch (action.type) {
    case WorkspacesActions.RECEIVED_USER_WORKSPACES:
      return {
        list: [...action.payload],
      };
    case WorkspacesActions.RECEIVED_USER_WORKSPACES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case WorkspacesActions.ADD_WORKSPACE:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default WorkspacesReducer;
