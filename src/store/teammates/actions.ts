import {
  REQUEST_WORKSPACE_TEAMMATES,
  RECEIVED_WORKSPACE_TEAMMATES,
  RECEIVED_WORKSPACE_TEAMMATES_ERROR,
  ADD_TEAMMATE,
  TeammatesError,
  Teammate,
  TeammatesActionTypes,
} from './types';

export const requestWorkspaceTeammates = (): TeammatesActionTypes => ({
  type: REQUEST_WORKSPACE_TEAMMATES,
});

export const receivedWorkspaceTeammates = (
  teammates: Teammate[]
): TeammatesActionTypes => ({
  type: RECEIVED_WORKSPACE_TEAMMATES,
  payload: teammates,
});

export const receivedWorkspaceTeammatesError = (
  error: TeammatesError
): TeammatesActionTypes => ({
  type: RECEIVED_WORKSPACE_TEAMMATES_ERROR,
  payload: error,
});

export const addTeammate = (teammate: Teammate): TeammatesActionTypes => ({
  type: ADD_TEAMMATE,
  payload: teammate,
});
