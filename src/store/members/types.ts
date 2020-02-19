export const ADD_MEMBER = 'ADD_MEMBERS';
export const REQUEST_CHANNEL_MEMBERS = 'REQUEST_CHANNEL_MEMBERS';
export const RECEIVED_CHANNEL_MEMBERS = 'RECEIVED_CHANNEL_MEMBERS';
export const RECEIVED_CHANNEL_MEMBERS_ERROR = 'RECEIVED_CHANNEL_MEMBERS_ERROR';

export interface Member {
  id: number;
  username: string;
}

export type MembersError = string;

export interface MembersState {
  list: Member[];
  error?: MembersError;
}

interface RequestChannelMembers {
  type: typeof REQUEST_CHANNEL_MEMBERS;
}

interface ReceivedChannelMembers {
  type: typeof RECEIVED_CHANNEL_MEMBERS;
  payload: Member[];
}

interface ReceivedChannelMembersError {
  type: typeof RECEIVED_CHANNEL_MEMBERS_ERROR;
  payload: MembersError;
}

interface AddMember {
  type: typeof ADD_MEMBER;
  payload: Member;
}

export type MembersActionTypes =
  | RequestChannelMembers
  | ReceivedChannelMembers
  | ReceivedChannelMembersError
  | AddMember;
