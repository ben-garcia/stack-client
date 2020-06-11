import {
  TeammatesActions,
  TeammatesError,
  Teammate,
  TeammatesActionTypes,
} from './types';

export const addTeammate = (teammate: Teammate): TeammatesActionTypes => ({
  type: TeammatesActions.ADD_TEAMMATE,
  payload: teammate,
});

export const clearTeammates = () => ({
  type: TeammatesActions.CLEAR_TEAMMATES,
});

export const teammateConnected = (
  teammateUsername: string
): TeammatesActionTypes => ({
  type: TeammatesActions.TEAMMATE_CONNECTED,
  payload: teammateUsername,
});

export const teammateDisconnected = (
  teammateUsername: string
): TeammatesActionTypes => ({
  type: TeammatesActions.TEAMMATE_DISCONNECTED,
  payload: teammateUsername,
});

export const receivedWorkspaceTeammates = (
  teammates: Teammate[]
): TeammatesActionTypes => ({
  type: TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES,
  payload: teammates,
});

export const receivedWorkspaceTeammatesError = (
  error: TeammatesError
): TeammatesActionTypes => ({
  type: TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES_ERROR,
  payload: error,
});

export const requestWorkspaceTeammates = (): TeammatesActionTypes => ({
  type: TeammatesActions.REQUEST_WORKSPACE_TEAMMATES,
});
