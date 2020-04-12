export enum TeammatesActions {
  ADD_TEAMMATE = 'ADD_TEAMMATE',
  TEAMMATE_CONNECTED = 'TEAMMATE_CONNECTED',
  TEAMMATE_DISCONNECTED = 'TEAMMATE_DISCONNECTE',
  REQUEST_WORKSPACE_TEAMMATES = 'REQUEST_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES = 'RECEIVED_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES_ERROR = 'RECEIVED_WORKSPACE_TEAMMATES_ERROR',
}

export interface Teammate {
  id: number;
  username: string;
  active?: boolean;
}

export type TeammatesError = string;

export interface TeammatesState {
  list: Teammate[];
  error?: TeammatesError;
}

interface AddTeammate {
  type: typeof TeammatesActions.ADD_TEAMMATE;
  payload: Teammate;
}

interface TeammateConnected {
  type: typeof TeammatesActions.TEAMMATE_CONNECTED;
  payload: string;
}

interface TeammateDisconnected {
  type: typeof TeammatesActions.TEAMMATE_DISCONNECTED;
  payload: string;
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

export type TeammatesActionTypes =
  | AddTeammate
  | TeammateConnected
  | TeammateDisconnected
  | RequestWorkspaceTeammates
  | ReceivedWorkspaceTeammates
  | ReceivedWorkspaceTeammatesError;
