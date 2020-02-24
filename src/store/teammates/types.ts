export enum TeammatesActions {
  ADD_TEAMMATE = 'ADD_TEAMMATE',
  REQUEST_WORKSPACE_TEAMMATES = 'REQUEST_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES = 'RECEIVED_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES_ERROR = 'RECEIVED_WORKSPACE_TEAMMATES_ERROR',
}

export interface Teammate {
  id: number;
  username: string;
}

export type TeammatesError = string;

export interface TeammatesState {
  list: Teammate[];
  error?: TeammatesError;
}

interface RequestWorkspaceTeammates {
  type: typeof TeammatesActions.REQUEST_WORKSPACE_TEAMMATES;
}

interface ReceivedWorkspaceTeammates {
  type: typeof TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES;
  payload: Teammate[];
}

interface ReceivedWorkspaceTeammatesError {
  type: typeof TeammatesActions.RECEIVED_WORKSPACE_TEAMMATES_ERROR;
  payload: TeammatesError;
}

interface AddTeammate {
  type: typeof TeammatesActions.ADD_TEAMMATE;
  payload: Teammate;
}

export type TeammatesActionTypes =
  | RequestWorkspaceTeammates
  | ReceivedWorkspaceTeammates
  | ReceivedWorkspaceTeammatesError
  | AddTeammate;
