import {
  WorkspacesState,
  WorkspacesActions,
  WorkspacesActionTypes,
} from './types';

const initialState: WorkspacesState = {
  isLoading: false,
  list: [],
};

const WorkspacesReducer = (
  state: Readonly<WorkspacesState> = initialState,
  action: WorkspacesActionTypes
): WorkspacesState => {
  switch (action.type) {
    case WorkspacesActions.ADD_WORKSPACE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case WorkspacesActions.REQUEST_USER_WORKSPACES:
      return {
        ...state,
        isLoading: true,
      };
    case WorkspacesActions.RECEIVED_USER_WORKSPACES:
      return {
        isLoading: false,
        list: [...action.payload],
      };
    case WorkspacesActions.RECEIVED_USER_WORKSPACES_ERROR:
      return {
        error: action.payload,
        isLoading: false,
        list: [],
      };
    default:
      return state;
  }
};

export default WorkspacesReducer;
