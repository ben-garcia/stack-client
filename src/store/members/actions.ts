import {
  REQUEST_WORKSPACE_MEMBERS,
  RECEIVED_WORKSPACE_MEMBERS,
  RECEIVED_WORKSPACE_MEMBERS_ERROR,
  ADD_MEMBER,
  MembersError,
  Member,
  MembersActionTypes,
} from './types';

export const requestWorkspaceMembers = (): MembersActionTypes => ({
  type: REQUEST_WORKSPACE_MEMBERS,
});

export const receivedWorkspaceMembers = (
  members: Member[]
): MembersActionTypes => ({
  type: RECEIVED_WORKSPACE_MEMBERS,
  payload: members,
});

export const receivedWorkspaceMembersError = (
  error: MembersError
): MembersActionTypes => ({
  type: RECEIVED_WORKSPACE_MEMBERS_ERROR,
  payload: error,
});

export const addMember = (member: Member) => ({
  type: ADD_MEMBER,
  payload: member,
});
