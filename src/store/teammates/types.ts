export const REQUEST_WORKSPACE_TEAMMATES = 'REQUEST_WORKSPACE_TEAMMATES';
export const RECEIVED_WORKSPACE_TEAMMATES = 'RECEIVED_WORKSPACE_TEAMMATES';
export const RECEIVED_WORKSPACE_TEAMMATES_ERROR =
  'RECEIVED_WORKSPACE_TEAMMATES_ERROR';

export const ADD_TEAMMATE = 'ADD_TEAMMATE';

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
  type: typeof REQUEST_WORKSPACE_TEAMMATES;
}

interface ReceivedWorkspaceTeammates {
  type: typeof RECEIVED_WORKSPACE_TEAMMATES;
  payload: Teammate[];
}

interface ReceivedWorkspaceTeammatesError {
  type: typeof RECEIVED_WORKSPACE_TEAMMATES_ERROR;
  payload: TeammatesError;
}

interface AddTeammate {
  type: typeof ADD_TEAMMATE;
  payload: Teammate;
}

export type TeammatesActionTypes =
  | RequestWorkspaceTeammates
  | ReceivedWorkspaceTeammates
  | ReceivedWorkspaceTeammatesError
  | AddTeammate;
