export enum TeammatesActions {
  ADD_TEAMMATE = 'ADD_TEAMMATE',
  CLEAR_TEAMMATES = 'CLEAR_TEAMMATES',
  TEAMMATE_CONNECTED = 'TEAMMATE_CONNECTED',
  TEAMMATE_DISCONNECTED = 'TEAMMATE_DISCONNECTED',
  REQUEST_WORKSPACE_TEAMMATES = 'REQUEST_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES = 'RECEIVED_WORKSPACE_TEAMMATES',
  RECEIVED_WORKSPACE_TEAMMATES_ERROR = 'RECEIVED_WORKSPACE_TEAMMATES_ERROR',
}

export interface Teammate {
  active?: boolean;
  color?: string;
  id: number;
  username: string;
}

export type TeammatesError = string;

export interface TeammatesState {
  error?: TeammatesError;
  isLoading: boolean;
  list: Teammate[];
}

interface AddTeammate {
  type: typeof TeammatesActions.ADD_TEAMMATE;
  payload: Teammate;
}

interface ClearTeammates {
  type: typeof TeammatesActions.CLEAR_TEAMMATES;
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
  | ClearTeammates
  | TeammateConnected
  | TeammateDisconnected
  | RequestWorkspaceTeammates
  | ReceivedWorkspaceTeammates
  | ReceivedWorkspaceTeammatesError;
