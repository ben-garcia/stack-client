export const REQUEST_WORKSPACE_MEMBERS = 'REQUEST_WORKSPACE_MEMBERS';
export const RECEIVED_WORKSPACE_MEMBERS = 'RECEIVED_WORKSPACE_MEMBERS';
export const RECEIVED_WORKSPACE_MEMBERS_ERROR =
  'RECEIVED_WORKSPACE_MEMBERS_ERROR';

export const ADD_MEMBER = 'ADD_MEMBER';

export interface Member {
  id: number;
  username: string;
}

export type MembersError = string;

export interface MembersState {
  list: Member[];
  error?: MembersError;
}

interface RequestWorkspaceMembers {
  type: typeof REQUEST_WORKSPACE_MEMBERS;
}

interface ReceivedWorkspaceMembers {
  type: typeof RECEIVED_WORKSPACE_MEMBERS;
  payload: Member[];
}

interface ReceivedWorkspaceMembersError {
  type: typeof RECEIVED_WORKSPACE_MEMBERS_ERROR;
  payload: MembersError;
}

interface AddMember {
  type: typeof ADD_MEMBER;
  payload: Member;
}

export type MembersActionTypes =
  | RequestWorkspaceMembers
  | ReceivedWorkspaceMembers
  | ReceivedWorkspaceMembersError
  | AddMember;
