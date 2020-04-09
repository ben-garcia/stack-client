import {
  WorkspaceActions,
  WorkspaceState,
  WorkspaceActionTypes,
} from './types';

const initialState: WorkspaceState = {
  id: 0,
  name: '',
  ownerId: 0,
  createdAt: '',
  updatedAt: '',
};

const WorkspaceReducer = (
  state: Readonly<WorkspaceState> = initialState,
  action: WorkspaceActionTypes
): WorkspaceState => {
  switch (action.type) {
    case WorkspaceActions.GET_CURRENT_WORKSPACE:
      return action.payload;
    default:
      return state;
  }
};

export default WorkspaceReducer;
